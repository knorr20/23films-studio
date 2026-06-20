"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

const STORAGE_KEY = "23films-towerblox-best";

const BLOCK_HEIGHT = 26;
const INITIAL_WIDTH = 176;
const CANVAS_WIDTH = 320;
const CANVAS_HEIGHT = 400;
const GROUND_PADDING = 36;
const BASE_SPEED = 1.8;
const MAX_SPEED = 4;
const SPEED_GROWTH = 0.05;

/** Minimum shared width before game over (px). */
const MIN_OVERLAP = 5;
/** Center offset treated as a perfect snap (px). */
const PERFECT_CENTER_TOLERANCE = 13;
/** Width loss still forgiven into a perfect stack (px). */
const PERFECT_WIDTH_TOLERANCE = 22;
/** Soft rescue when enough block still lands on target (% of top width). */
const SOFT_RESCUE_RATIO = 0.3;
const SOFT_RESCUE_CENTER = 18;
/** Max width lost on a single non-perfect drop (% of top width). */
const MAX_TRIM_RATIO = 0.14;

type Block = {
  x: number;
  y: number;
  w: number;
};

type TrimPiece = {
  x: number;
  y: number;
  w: number;
  vy: number;
  opacity: number;
};

type DropAnim = {
  block: Block;
  fromY: number;
  progress: number;
  nextMoverW: number;
  isPerfect: boolean;
};

type Flash = {
  text: string;
  opacity: number;
};

type Phase = "idle" | "playing" | "over";

function readBest(): number {
  if (typeof window === "undefined") return 0;
  const value = Number(localStorage.getItem(STORAGE_KEY));
  return Number.isFinite(value) ? value : 0;
}

function writeBest(score: number) {
  localStorage.setItem(STORAGE_KEY, String(score));
}

function streakMultiplier(streak: number): number {
  if (streak >= 8) return 4;
  if (streak >= 5) return 3;
  if (streak >= 3) return 2;
  return 1;
}

function resolvePlacement(
  moverX: number,
  moverW: number,
  top: Block,
  moverY: number,
): {
  placed: Block;
  isPerfect: boolean;
  trims: TrimPiece[];
} | null {
  const overlapLeft = Math.max(moverX, top.x);
  const overlapRight = Math.min(moverX + moverW, top.x + top.w);
  const overlapW = overlapRight - overlapLeft;

  if (overlapW <= MIN_OVERLAP) return null;

  const moverCenter = moverX + moverW / 2;
  const topCenter = top.x + top.w / 2;
  const centerOffset = Math.abs(moverCenter - topCenter);
  const widthDelta = Math.abs(moverW - top.w);
  const edgeDelta = Math.max(
    Math.abs(moverX - top.x),
    Math.abs(moverX + moverW - (top.x + top.w)),
  );

  const canSnapPerfect =
    centerOffset <= PERFECT_CENTER_TOLERANCE &&
    edgeDelta <= PERFECT_WIDTH_TOLERANCE &&
    overlapW >= top.w - PERFECT_WIDTH_TOLERANCE;

  const canSoftRescue =
    centerOffset <= SOFT_RESCUE_CENTER &&
    overlapW >= top.w * SOFT_RESCUE_RATIO;

  if (canSnapPerfect || canSoftRescue) {
    return {
      placed: { x: top.x, y: moverY, w: top.w },
      isPerfect: canSnapPerfect,
      trims: [],
    };
  }

  const trims: TrimPiece[] = [];

  if (moverX < overlapLeft) {
    trims.push({
      x: moverX,
      y: moverY,
      w: overlapLeft - moverX,
      vy: 0.4,
      opacity: 1,
    });
  }

  if (moverX + moverW > overlapRight) {
    trims.push({
      x: overlapRight,
      y: moverY,
      w: moverX + moverW - overlapRight,
      vy: 0.4,
      opacity: 1,
    });
  }

  const isPerfect =
    trims.length === 0 &&
    centerOffset <= 3 &&
    widthDelta <= 3;

  let placedW = overlapW;
  const minWidthAfterTrim = top.w * (1 - MAX_TRIM_RATIO);
  if (placedW < minWidthAfterTrim) {
    placedW = minWidthAfterTrim;
  }

  const placedCenter = overlapLeft + overlapW / 2;
  const placedX = Math.max(
    0,
    Math.min(placedCenter - placedW / 2, CANVAS_WIDTH - placedW),
  );

  return {
    placed: { x: placedX, y: moverY, w: placedW },
    isPerfect,
    trims,
  };
}

export function TowerBlox404() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const stateRef = useRef({
    phase: "idle" as Phase,
    blocks: [] as Block[],
    trimPieces: [] as TrimPiece[],
    moverX: 0,
    moverDir: 1,
    moverSpeed: BASE_SPEED,
    cameraY: 0,
    score: 0,
    streak: 0,
    dropAnim: null as DropAnim | null,
    pendingMoverW: INITIAL_WIDTH,
    flash: null as Flash | null,
  });

  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [streak, setStreak] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [phase, setPhase] = useState<Phase>("idle");

  const syncUi = useCallback(
    (nextPhase: Phase, nextScore: number, nextStreak: number) => {
      setPhase(nextPhase);
      setScore(nextScore);
      setStreak(nextStreak);
      setMultiplier(streakMultiplier(nextStreak));
    },
    [],
  );

  const resetGame = useCallback(() => {
    const baseY = CANVAS_HEIGHT - GROUND_PADDING - BLOCK_HEIGHT;
    const base: Block = {
      x: (CANVAS_WIDTH - INITIAL_WIDTH) / 2,
      y: baseY,
      w: INITIAL_WIDTH,
    };

    stateRef.current = {
      phase: "playing",
      blocks: [base],
      trimPieces: [],
      moverX: (CANVAS_WIDTH - INITIAL_WIDTH) / 2,
      moverDir: 1,
      moverSpeed: BASE_SPEED,
      cameraY: 0,
      score: 0,
      streak: 0,
      dropAnim: null,
      pendingMoverW: INITIAL_WIDTH,
      flash: null,
    };
    syncUi("playing", 0, 0);
  }, [syncUi]);

  const finishDrop = useCallback((state: typeof stateRef.current, anim: DropAnim) => {
    state.blocks.push(anim.block);

    if (anim.isPerfect) {
      state.streak += 1;
      const mult = streakMultiplier(state.streak);
      state.score += mult;
      state.flash = {
        text:
          state.streak >= 3
            ? `PERFECT x${state.streak}`
            : "PERFECT",
        opacity: 1,
      };
    } else {
      state.streak = 0;
      state.score += 1;
    }

    state.pendingMoverW = anim.nextMoverW;
    state.moverSpeed = Math.min(MAX_SPEED, BASE_SPEED + state.blocks.length * SPEED_GROWTH);
    state.moverX = Math.random() > 0.5 ? 0 : CANVAS_WIDTH - anim.nextMoverW;
    state.moverDir = state.moverX < CANVAS_WIDTH / 2 ? 1 : -1;
    state.dropAnim = null;

    const targetCamera = Math.max(
      0,
      CANVAS_HEIGHT - GROUND_PADDING - anim.block.y - 140,
    );
    state.cameraY += (targetCamera - state.cameraY) * 0.35;
    syncUi(state.phase, state.score, state.streak);
  }, [syncUi]);

  const placeBlock = useCallback(() => {
    const state = stateRef.current;
    if (state.phase !== "playing" || state.dropAnim) return;

    const top = state.blocks[state.blocks.length - 1];
    const moverW = state.pendingMoverW;
    const moverY = top.y - BLOCK_HEIGHT;
    const result = resolvePlacement(state.moverX, moverW, top, moverY);

    if (!result) {
      state.phase = "over";
      const currentBest = readBest();
      if (state.score > currentBest) {
        writeBest(state.score);
        setBest(state.score);
      }
      syncUi("over", state.score, 0);
      return;
    }

    state.trimPieces.push(...result.trims);

    state.dropAnim = {
      block: result.placed,
      fromY: moverY - 20,
      progress: 0,
      nextMoverW: result.placed.w,
      isPerfect: result.isPerfect,
    };
  }, [syncUi]);

  const handleAction = useCallback(() => {
    const state = stateRef.current;
    if (state.phase === "idle" || state.phase === "over") {
      resetGame();
      return;
    }
    placeBlock();
  }, [placeBlock, resetGame]);

  useEffect(() => {
    setBest(readBest());
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space" || event.code === "Enter") {
        event.preventDefault();
        handleAction();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleAction]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = CANVAS_WIDTH * dpr;
    canvas.height = CANVAS_HEIGHT * dpr;
    canvas.style.width = `${CANVAS_WIDTH}px`;
    canvas.style.height = `${CANVAS_HEIGHT}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const drawBlock = (block: Block, fill: string, stroke: string) => {
      ctx.fillStyle = fill;
      ctx.fillRect(block.x, block.y, block.w, BLOCK_HEIGHT);
      ctx.strokeStyle = stroke;
      ctx.strokeRect(block.x + 0.5, block.y + 0.5, block.w - 1, BLOCK_HEIGHT - 1);
    };

    const draw = () => {
      const state = stateRef.current;
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      ctx.strokeStyle = "#1f1f1f";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(24, CANVAS_HEIGHT - GROUND_PADDING + 8);
      ctx.lineTo(CANVAS_WIDTH - 24, CANVAS_HEIGHT - GROUND_PADDING + 8);
      ctx.stroke();

      ctx.save();
      ctx.translate(0, state.cameraY);

      for (const block of state.blocks) {
        drawBlock(block, "#141414", "#2a2a2a");
      }

      for (const piece of state.trimPieces) {
        ctx.fillStyle = `rgba(245, 245, 245, ${piece.opacity * 0.5})`;
        ctx.fillRect(piece.x, piece.y, piece.w, BLOCK_HEIGHT - 4);
      }

      if (state.phase === "playing") {
        if (state.dropAnim) {
          const anim = state.dropAnim;
          anim.progress = Math.min(1, anim.progress + 0.16);
          const eased = 1 - (1 - anim.progress) ** 3;
          const y = anim.fromY + (anim.block.y - anim.fromY) * eased;
          drawBlock({ ...anim.block, y }, "#f5f5f5", "#d8d8d8");

          if (anim.progress >= 1) {
            finishDrop(state, anim);
          }
        } else {
          const top = state.blocks[state.blocks.length - 1];
          const moverY = top.y - BLOCK_HEIGHT;
          state.moverX += state.moverSpeed * state.moverDir;
          const maxX = CANVAS_WIDTH - state.pendingMoverW;

          if (state.moverX <= 0) {
            state.moverX = 0;
            state.moverDir = 1;
          } else if (state.moverX >= maxX) {
            state.moverX = maxX;
            state.moverDir = -1;
          }

          drawBlock(
            { x: state.moverX, y: moverY, w: state.pendingMoverW },
            "#f5f5f5",
            "#d8d8d8",
          );
        }
      }

      if (state.flash) {
        state.flash.opacity -= 0.045;
        if (state.flash.opacity <= 0) {
          state.flash = null;
        } else {
          ctx.fillStyle = `rgba(245, 245, 245, ${state.flash.opacity})`;
          ctx.font = "600 10px Inter, sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(state.flash.text, CANVAS_WIDTH / 2, 28);
        }
      }

      if (state.phase === "over") {
        ctx.fillStyle = "rgba(10, 10, 10, 0.72)";
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.fillStyle = "#f5f5f5";
        ctx.font = "600 11px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("MISSED", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 6);
        ctx.fillStyle = "#888888";
        ctx.font = "500 10px Inter, sans-serif";
        ctx.fillText("TAP TO RETRY", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 14);
      }

      ctx.restore();
      frameRef.current = window.requestAnimationFrame(draw);

      state.trimPieces = state.trimPieces
        .map((piece) => ({
          ...piece,
          y: piece.y + piece.vy,
          vy: piece.vy + 0.5,
          opacity: piece.opacity - 0.016,
        }))
        .filter((piece) => piece.opacity > 0 && piece.y < CANVAS_HEIGHT + 80);
    };

    frameRef.current = window.requestAnimationFrame(draw);
    return () => window.cancelAnimationFrame(frameRef.current);
  }, [finishDrop]);

  const onPointerDown = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    handleAction();
  };

  const hint =
    phase === "idle"
      ? "Tap or press Space to play"
      : phase === "over"
        ? "Tap or press Space to retry"
        : "Tap or press Space to stack";

  return (
    <section className="section-padding flex min-h-[calc(100vh-80px)] flex-col items-center justify-center pt-28 text-center md:pt-32">
      <p className="text-caption mb-4">404</p>
      <h1 className="font-display text-3xl text-display text-text md:text-5xl">
        Not Found
      </h1>
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-muted">
        Wrong floor. Stack blocks while you&apos;re here.
      </p>

      <div className="mt-10 flex flex-col items-center gap-5">
        <canvas
          ref={canvasRef}
          className="touch-none cursor-pointer border border-border bg-bg"
          onPointerDown={onPointerDown}
          role="img"
          aria-label="Tower Blox stacking game"
        />

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-nav text-text-muted">
          <p>
            Score <span className="text-text">{score}</span>
          </p>
          <p>
            Best <span className="text-text">{best}</span>
          </p>
          {streak > 0 && (
            <p>
              Streak <span className="text-text">{streak}</span>
              {multiplier > 1 && (
                <span className="text-text-subtle"> · x{multiplier}</span>
              )}
            </p>
          )}
        </div>

        <p className="text-caption">{hint}</p>
      </div>

      <Link href="/" className="mt-10 text-nav link-arrow text-text-muted">
        Back to home →
      </Link>
    </section>
  );
}

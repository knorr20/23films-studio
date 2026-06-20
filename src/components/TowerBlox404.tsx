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

const BLOCK_W = 112;
const BLOCK_H = 24;
const CANVAS_W = 320;
const CANVAS_H = 400;
const BASE_Y = CANVAS_H - 44;
const BASE_X = CANVAS_W / 2;
const LIVES_START = 3;

const CRANE_BASE_SPEED = 1.55;
const CRANE_MAX_SPEED = 3.4;
const CRANE_SPEED_PER_FLOOR = 0.028;

const MISS_OVERLAP_RATIO = 0.22;
const PERFECT_OFFSET = 7;

const TILT_IMPULSE = 0.0011;
const TILT_WIND_FACTOR = 0.04;
const TILT_RESTORE = 0.014;
const TILT_DAMPING = 0.045;
const PERFECT_DAMPING = 0.18;

type Phase = "idle" | "playing" | "over";

type FallingMiss = {
  x: number;
  y: number;
  vy: number;
  opacity: number;
};

type DropAnim = {
  centerX: number;
  fromY: number;
  toY: number;
  progress: number;
};

type Flash = { text: string; opacity: number };

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

/** World X of a floor center with tower sway applied. */
function floorWorldX(
  centerX: number,
  floorIndex: number,
  angle: number,
): number {
  const localX = centerX - BASE_X;
  const localY = -floorIndex * BLOCK_H;
  return (
    BASE_X + localX * Math.cos(angle) - localY * Math.sin(angle)
  );
}

export function TowerBlox404() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  const stateRef = useRef({
    phase: "idle" as Phase,
    floorCenters: [BASE_X] as number[],
    angle: 0,
    angleVel: 0,
    craneX: (CANVAS_W - BLOCK_W) / 2,
    craneDir: 1,
    lives: LIVES_START,
    score: 0,
    streak: 0,
    cameraY: 0,
    dropAnim: null as DropAnim | null,
    falling: [] as FallingMiss[],
    flash: null as Flash | null,
  });

  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [lives, setLives] = useState(LIVES_START);
  const [streak, setStreak] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [phase, setPhase] = useState<Phase>("idle");

  const syncUi = useCallback(
    (
      nextPhase: Phase,
      nextScore: number,
      nextStreak: number,
      nextLives: number,
    ) => {
      setPhase(nextPhase);
      setScore(nextScore);
      setStreak(nextStreak);
      setMultiplier(streakMultiplier(nextStreak));
      setLives(nextLives);
    },
    [],
  );

  const craneSpeed = (floors: number) =>
    Math.min(
      CRANE_MAX_SPEED,
      CRANE_BASE_SPEED + Math.max(0, floors - 1) * CRANE_SPEED_PER_FLOOR,
    );

  const resetGame = useCallback(() => {
    stateRef.current = {
      phase: "playing",
      floorCenters: [BASE_X],
      angle: 0,
      angleVel: 0,
      craneX: (CANVAS_W - BLOCK_W) / 2,
      craneDir: 1,
      lives: LIVES_START,
      score: 0,
      streak: 0,
      cameraY: 0,
      dropAnim: null,
      falling: [],
      flash: null,
    };
    syncUi("playing", 0, 0, LIVES_START);
  }, [syncUi]);

  const gameOver = useCallback(
    (state: typeof stateRef.current) => {
      state.phase = "over";
      const currentBest = readBest();
      if (state.score > currentBest) {
        writeBest(state.score);
        setBest(state.score);
      }
      syncUi("over", state.score, 0, state.lives);
    },
    [syncUi],
  );

  const registerMiss = useCallback(
    (state: typeof stateRef.current, x: number, y: number) => {
      state.lives -= 1;
      state.streak = 0;
      state.falling.push({ x, y, vy: 0.2, opacity: 1 });
      state.flash = { text: "MISS", opacity: 1 };
      state.angleVel += (Math.random() - 0.5) * 0.006;

      if (state.lives <= 0) {
        gameOver(state);
      } else {
        setLives(state.lives);
        setStreak(0);
        setMultiplier(1);
      }
    },
    [gameOver],
  );

  const finishDrop = useCallback(
    (state: typeof stateRef.current, anim: DropAnim) => {
      const floors = state.floorCenters.length;
      const topIdx = floors - 1;
      const targetX = floorWorldX(
        state.floorCenters[topIdx],
        topIdx,
        state.angle,
      );
      const offset = anim.centerX - targetX;
      const isPerfect = Math.abs(offset) <= PERFECT_OFFSET;

      state.floorCenters.push(anim.centerX);

      const wind = 1 + floors * TILT_WIND_FACTOR;
      state.angleVel += offset * TILT_IMPULSE * wind;

      if (isPerfect) {
        state.streak += 1;
        state.score += streakMultiplier(state.streak);
        state.angleVel *= 1 - PERFECT_DAMPING;
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

      state.dropAnim = null;
      state.craneX = Math.random() > 0.5 ? 0 : CANVAS_W - BLOCK_W;
      state.craneDir = state.craneX < CANVAS_W / 2 ? 1 : -1;

      const towerTopY = BASE_Y - state.floorCenters.length * BLOCK_H;
      const targetCamera = Math.max(0, CANVAS_H - 150 - towerTopY);
      state.cameraY += (targetCamera - state.cameraY) * 0.3;

      syncUi(state.phase, state.score, state.streak, state.lives);
    },
    [syncUi],
  );

  const dropBlock = useCallback(() => {
    const state = stateRef.current;
    if (state.phase !== "playing" || state.dropAnim) return;

    const floors = state.floorCenters.length;
    const topIdx = floors - 1;
    const towerTopY = BASE_Y - floors * BLOCK_H;
    const craneY = towerTopY - BLOCK_H - 18;
    const targetX = floorWorldX(
      state.floorCenters[topIdx],
      topIdx,
      state.angle,
    );
    const dropCenterX = state.craneX + BLOCK_W / 2;

    const left = Math.max(dropCenterX - BLOCK_W / 2, targetX - BLOCK_W / 2);
    const right = Math.min(dropCenterX + BLOCK_W / 2, targetX + BLOCK_W / 2);
    const overlap = right - left;

    if (overlap < BLOCK_W * MISS_OVERLAP_RATIO) {
      registerMiss(state, state.craneX, craneY);
      return;
    }

    state.dropAnim = {
      centerX: dropCenterX,
      fromY: craneY - 16,
      toY: towerTopY - BLOCK_H,
      progress: 0,
    };
  }, [registerMiss]);

  const handleAction = useCallback(() => {
    const state = stateRef.current;
    if (state.phase === "idle" || state.phase === "over") {
      resetGame();
      return;
    }
    dropBlock();
  }, [dropBlock, resetGame]);

  useEffect(() => {
    setBest(readBest());
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
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
    canvas.width = CANVAS_W * dpr;
    canvas.height = CANVAS_H * dpr;
    canvas.style.width = `${CANVAS_W}px`;
    canvas.style.height = `${CANVAS_H}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const drawFloor = (
      centerX: number,
      y: number,
      fill: string,
      stroke: string,
    ) => {
      ctx.fillStyle = fill;
      ctx.fillRect(centerX - BLOCK_W / 2, y, BLOCK_W, BLOCK_H);
      ctx.strokeStyle = stroke;
      ctx.strokeRect(
        centerX - BLOCK_W / 2 + 0.5,
        y + 0.5,
        BLOCK_W - 1,
        BLOCK_H - 1,
      );
    };

    const draw = () => {
      const s = stateRef.current;
      const floors = s.floorCenters.length;

      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      ctx.strokeStyle = "#1f1f1f";
      ctx.beginPath();
      ctx.moveTo(28, BASE_Y + BLOCK_H + 6);
      ctx.lineTo(CANVAS_W - 28, BASE_Y + BLOCK_H + 6);
      ctx.stroke();

      ctx.save();
      ctx.translate(0, s.cameraY);

      ctx.save();
      ctx.translate(BASE_X, BASE_Y);
      ctx.rotate(s.angle);

      for (let i = 0; i < floors; i++) {
        const localX = s.floorCenters[i] - BASE_X;
        const y = -i * BLOCK_H;
        const fill = i === 0 ? "#1a1a1a" : "#141414";
        const stroke = i === 0 ? "#333" : "#2a2a2a";
        drawFloor(localX, y, fill, stroke);
      }

      if (s.dropAnim) {
        const a = s.dropAnim;
        a.progress = Math.min(1, a.progress + 0.18);
        const eased = 1 - (1 - a.progress) ** 3;
        const y = a.fromY + (a.toY - a.fromY) * eased;
        const localX = a.centerX - BASE_X;
        drawFloor(localX, y, "#f5f5f5", "#d4d4d4");
        if (a.progress >= 1) finishDrop(s, a);
      }

      ctx.restore();

      for (const piece of s.falling) {
        ctx.fillStyle = `rgba(245, 245, 245, ${piece.opacity * 0.45})`;
        ctx.fillRect(piece.x, piece.y, BLOCK_W, BLOCK_H);
      }

      if (s.phase === "playing" && !s.dropAnim) {
        const towerTopY = BASE_Y - floors * BLOCK_H;
        const craneY = towerTopY - BLOCK_H - 18;
        const topWorldXNow = floorWorldX(
          s.floorCenters[floors - 1],
          floors - 1,
          s.angle,
        );
        const craneCenterX = s.craneX + BLOCK_W / 2;

        ctx.strokeStyle = "#333";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(craneCenterX, craneY - 24);
        ctx.lineTo(topWorldXNow, towerTopY - 2);
        ctx.stroke();

        ctx.fillStyle = "#f5f5f5";
        ctx.fillRect(s.craneX, craneY, BLOCK_W, BLOCK_H);
        ctx.strokeStyle = "#d4d4d4";
        ctx.strokeRect(s.craneX + 0.5, craneY + 0.5, BLOCK_W - 1, BLOCK_H - 1);

        const speed = craneSpeed(floors);
        s.craneX += speed * s.craneDir;
        const maxX = CANVAS_W - BLOCK_W;
        if (s.craneX <= 0) {
          s.craneX = 0;
          s.craneDir = 1;
        } else if (s.craneX >= maxX) {
          s.craneX = maxX;
          s.craneDir = -1;
        }
      }

      if (s.flash) {
        s.flash.opacity -= 0.05;
        if (s.flash.opacity <= 0) s.flash = null;
        else {
          ctx.fillStyle = `rgba(245, 245, 245, ${s.flash.opacity})`;
          ctx.font = "600 10px Inter, sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(s.flash.text, CANVAS_W / 2, 30);
        }
      }

      if (s.phase === "over") {
        ctx.fillStyle = "rgba(10, 10, 10, 0.75)";
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
        ctx.fillStyle = "#f5f5f5";
        ctx.font = "600 11px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("BUILDING COLLAPSED", CANVAS_W / 2, CANVAS_H / 2 - 8);
        ctx.fillStyle = "#888";
        ctx.font = "500 10px Inter, sans-serif";
        ctx.fillText("TAP TO RETRY", CANVAS_W / 2, CANVAS_H / 2 + 12);
      }

      ctx.restore();

      if (s.phase === "playing") {
        s.angleVel += -s.angle * TILT_RESTORE - s.angleVel * TILT_DAMPING;
        s.angle += s.angleVel;
      }

      s.falling = s.falling
        .map((p) => ({
          ...p,
          y: p.y + p.vy,
          vy: p.vy + 0.6,
          opacity: p.opacity - 0.018,
        }))
        .filter((p) => p.opacity > 0 && p.y < CANVAS_H + 40);

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, [finishDrop]);

  const onPointerDown = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    handleAction();
  };

  const hint =
    phase === "idle"
      ? "Tap or press Space to play"
      : phase === "over"
        ? "Tap or press Space to retry"
        : "Drop when aligned · 3 misses";

  return (
    <section className="section-padding flex min-h-[calc(100vh-80px)] flex-col items-center justify-center pt-28 text-center md:pt-32">
      <p className="text-caption mb-4">404</p>
      <h1 className="font-display text-3xl text-display text-text md:text-5xl">
        Not Found
      </h1>
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-muted">
        Wrong floor. Stack the building.
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
          <p>
            Lives <span className="text-text">{lives}</span>
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

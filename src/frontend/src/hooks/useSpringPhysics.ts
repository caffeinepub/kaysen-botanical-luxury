import { useEffect, useState, useRef } from 'react';

interface SpringConfig {
  target: number;
  stiffness?: number;
  damping?: number;
}

interface SpringState {
  value: number;
  velocity: number;
}

export function useSpringPhysics({
  target,
  stiffness = 0.1,
  damping = 0.8,
}: SpringConfig): SpringState {
  const [state, setState] = useState<SpringState>({ value: 0, velocity: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    let currentValue = state.value;
    let currentVelocity = state.velocity;

    const animate = () => {
      // Spring physics calculation
      const displacement = target - currentValue;
      const springForce = displacement * stiffness;
      const dampingForce = currentVelocity * damping;

      currentVelocity += springForce - dampingForce;
      currentValue += currentVelocity;

      setState({ value: currentValue, velocity: currentVelocity });

      // Continue animation if still moving
      if (Math.abs(currentVelocity) > 0.001 || Math.abs(displacement) > 0.001) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [target, stiffness, damping]);

  return state;
}

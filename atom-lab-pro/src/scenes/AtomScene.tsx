import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import { shells } from "../logic/atom";
import { useSim } from "../store/simulationStore";

function Nucleus() {
  const { p, n, exploded } = useSim();
  const g = useRef<THREE.Group>(null!);
  const items = useMemo(() => {
    const N = p + n, spread = 0.34 * Math.cbrt(Math.max(N, 1)) + 0.1;
    return Array.from({ length: N }, (_, i) => {
      const y = N === 1 ? 0 : 1 - (2 * (i + 0.5)) / N, r = Math.sqrt(1 - y * y), a = i * 2.39996;
      const k = N === 1 ? 0 : spread * (0.5 + 0.5 * ((i % 3) / 2));
      return { pos: new THREE.Vector3(Math.cos(a) * r * k, y * k, Math.sin(a) * r * k), proton: i < p };
    });
  }, [p, n]);
  useFrame((_, d) => { const s = THREE.MathUtils.damp(g.current.scale.x, exploded ? 3 : 1, 4, d); g.current.scale.setScalar(s); });
  return <group ref={g}>{items.map((it, i) => (
    <mesh key={i} position={it.pos}><sphereGeometry args={[0.28, 24, 18]} />
      <meshStandardMaterial color={it.proton ? "#ff4d5e" : "#b4bcd2"} emissive={it.proton ? "#550010" : "#1a2030"} roughness={0.4} /></mesh>))}</group>;
}

function Electrons() {
  const { p, e, cloud, paused, exploded } = useSim();
  const refs = useRef<THREE.Mesh[]>([]);
  const list = useMemo(() => shells(e, p).flatMap((c, si) => Array.from({ length: c }, (_, k) => ({ si, k, c, rr: 2 + si, ph: Math.random() * 6.28 }))), [e, p]);
  const t = useRef(0);
  useFrame((_, d) => {
    if (!paused) t.current += d;
    const x = exploded ? 2.6 : 1;
    list.forEach((u, i) => {
      const m = refs.current[i]; if (!m) return; const rr = u.rr * x;
      if (!cloud) { const a = u.ph + (t.current * 1.5) / (1 + u.si * 0.5) + (u.k * 6.28) / u.c; m.position.set(Math.cos(a) * rr, 0, Math.sin(a) * rr).applyAxisAngle(new THREE.Vector3(1, 0, 0), u.si * 0.6 + (u.k % 2) * 0.9); }
      else { const a = t.current * (1.2 + u.k * 0.13) + u.ph; m.position.set(rr * Math.sin(a * 1.1 + u.k) * Math.cos(a * 0.7), rr * 0.8 * Math.cos(a * 0.9 + u.si), rr * Math.sin(a * 0.7 + u.ph) * Math.sin(a * 1.3)); }
    });
  });
  const radii = [...new Set(list.map((u) => u.rr))];
  return <group>
    {list.map((_, i) => (<mesh key={`${i}-${list.length}`} ref={(m) => { if (m) refs.current[i] = m; }}><sphereGeometry args={[0.13, 16, 12]} />
      <meshStandardMaterial color="#3aa0ff" emissive="#0a4cff" emissiveIntensity={0.8} /></mesh>))}
    {radii.map((r) => cloud
      ? <mesh key={r} scale={exploded ? 2.6 : 1}><sphereGeometry args={[r, 32, 20]} /><meshBasicMaterial color="#2fe0d0" transparent opacity={0.07} depthWrite={false} /></mesh>
      : <mesh key={r} rotation-x={Math.PI / 2} scale={exploded ? 2.6 : 1}><torusGeometry args={[r, 0.012, 6, 96]} /><meshBasicMaterial color="#6a7cff" transparent opacity={0.45} /></mesh>)}
  </group>;
}

export default function AtomScene() {
  const bloom = useSim((s) => s.bloom), paused = useSim((s) => s.paused);
  return (
    <Canvas camera={{ position: [0, 0, 9], fov: 50 }} dpr={[1, 2]} gl={{ antialias: true }}>
      <color attach="background" args={["#070b1f"]} />
      <ambientLight intensity={0.7} /><directionalLight position={[5, 6, 8]} intensity={1.2} /><pointLight position={[-5, -3, 4]} color="#2fe0d0" intensity={30} />
      <Nucleus /><Electrons />
      <OrbitControls enablePan enableDamping minDistance={3} maxDistance={20} autoRotate={!paused} autoRotateSpeed={0.6} />
      {bloom && <EffectComposer><Bloom intensity={0.6} luminanceThreshold={0.4} mipmapBlur /></EffectComposer>}
    </Canvas>
  );
}

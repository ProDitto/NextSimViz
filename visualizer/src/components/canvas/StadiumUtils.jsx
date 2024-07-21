'use client'

import { FlyControls, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef } from 'react'
// import { Line, useCursor, MeshDistortMaterial } from '@react-three/drei'
// import { useRouter } from 'next/navigation'

export const Game = ({ ...props }) => {
  const { scene } = useGLTF('/stadium_optim.glb')

  useFrame((state, delta) => {})

  return (
    <>
      <FlyControls rollSpeed={2} movementSpeed={30} dragToLook />
      <primitive object={scene} />
      <Car/>
    </>
  )
}

export const Car = ({  ...props }) => {
  const { scene } = useGLTF('/octaneOptim.glb')

  useFrame((state, delta) => {})

  return (
    <>
      <FlyControls rollSpeed={2} movementSpeed={30} dragToLook />
      <group position={[0,0,0]}>
        <primitive object={scene} />
      </group>
    </>
  )
}

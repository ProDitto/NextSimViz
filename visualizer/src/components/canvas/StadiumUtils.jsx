'use client'

import { FlyControls, Instance, Instances, Sphere, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import pre_processing from '@/mock_data/pre_processing'
// import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Mesh } from 'three'
// import { Vector3 } from 'three'
// import { Line, useCursor, MeshDistortMaterial } from '@react-three/drei'
// import { useRouter } from 'next/navigation'

export const Game = ({ ...props }) => {
  const { scene } = useGLTF('/stadium_optim.glb')
  const result = useGLTF('/octaneOptim.glb')
  const [n_players, setNPlayers] = useState(4)
  const frames = useRef([
    {
      ball_pos: [-1352.216796875, -3205.457763671875, 92.86221313476562],
      pads: [
        0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
      ],
      player: [
        {
          pos: [-102.4647216796875, -4206.2373046875, 23.406843185424805],
          rot: [0.029198667034506798, -1.78403902053833, -0.38680678606033325],
          jump: false,
          flip: false,
          isDemoed: false,
          boostAmt: 0.017222260236740113,
          teamNum: 0,
          idx: 0,
        },
        {
          pos: [-689.8673095703125, -4433.91015625, 17.031946182250977],
          rot: [0.009510512463748455, -2.1576406955718994, -3.5391856556543644e-8],
          jump: true,
          flip: true,
          isDemoed: false,
          boostAmt: 0.0,
          teamNum: 1,
          idx: 1,
        },
      ],
    },
  ])

  const [frame, setFrame] = useState(frames.current[0])
  const idx = useRef(0)

  useEffect(() => {
    let n_players = 0
    // window.prompt('URL', async (url) => {
    // fetch('http://localhost:8000/')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     const p_data = pre_processing(data)
    //     console.log('PData :', p_data)
    //     n_players = p_data.n_players
    //     frames.current = p_data.data
    //   })
    //   .catch((err) => {
    //     console.error('Errror : ', err)
    //   })
    // })

    const response = window.prompt('data:')
    // console.log(JSON.parse(response))
    const p_data = pre_processing(JSON.parse(response))
    console.log('p_data : ', p_data)
    n_players = p_data.n_players
    frames.current = p_data.data

    setNPlayers(n_players)
  }, [])

  useFrame((state, delta) => {
    setFrame(frames.current[idx.current])
    idx.current = (idx.current + 1) % frames.current.length
  })

  return (
    <>
      <FlyControls rollSpeed={2} movementSpeed={30} dragToLook />
      <primitive object={scene} />
      {/* <Instances
        range={10}
        material={result.materials.ColorPaletteMaterial}
        geometry={result.nodes.OctaneOptim.geometry}
      >
        {frame.player.map((e, i) => (
          <CarData pos={e.pos} key={e.pos} />
        ))}
      </Instances> */}

      {/* <Instances range={n_players}>{frame.map((e, i) => i > 0 && <CarData pos={e} key={i} />)}</Instances> */}
      <Ball pos={frame.ball_pos} />
      {
        frame.player.map((e, i) => {
          return <Car key={e.idx} pos={e.pos} rot={e.rot} />
        })
      }
      {/* <Car pos={frame.player.pos[1]}/> */}
      {/* <group position={frame[1]}>
        <primitive object={octScene} />
      </group> */}
    </>
  )
}

export const CarData = ({ pos, rot }) => {
  return (
    <group>
      <Instance position={pos} rotation={rot} />
    </group>
  )
}

export const Car = ({ pos, ...props }) => {
  return (
    <group position={pos}>
      <Mesh geometry={nodes.OctaneOptim.geometry} material={materials.ColorPaletteMaterial} />
    </group>
  )
}

export const Ball = ({ pos, some_idx, ...props }) => {
  return <Sphere position={pos} scale={91.25 * 0.02} />
}

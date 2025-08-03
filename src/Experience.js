import {
  ContactShadows,
  Environment,
  Float,
  Html,
  OrbitControls,
  PresentationControls,
  Text,
  useGLTF,
} from '@react-three/drei'
import { Suspense, useEffect, useState } from 'react'
import { useThree } from '@react-three/fiber'

export default function Experience() {
  const computer = useGLTF('/macbook04.glb')
  const { viewport } = useThree()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

 // Responsive values
const macbookScale = isMobile ? 0.85 : 1
const macbookPositionY = isMobile ? -1.3 : -1.2
const textSize = isMobile ? 0.45 : 1
const textPosition = isMobile ? [0.5, 2.0, 0.9] : [2, 0.75, 0.75]


  return (
    <>
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>
      <color attach="background" args={['#0d5cb6']} />
<ContactShadows position-y={-1.4} scale={5} blur={2.4} />

<OrbitControls enableZoom={true} enableRotate={false} />



 <PresentationControls
  global
  rotation={[0.13, 0.1, 0]}
  polar={[-0.4, 0.2]}
  azimuth={[-1, 0.75]}
  config={{ mass: 2, tension: 400 }}
  snap={{ mass: 4, tension: 400 }}
>
  <Float rotationIntensity={0.4}>
    <group scale={isMobile ? 0.95 : 1} position-z={isMobile ? -0.3 : 0}>
      <rectAreaLight
        args={[2.5, 1.67]}
        intensity={65}
        color="#ada7a3"
        rotation={[0.1, Math.PI, 0]}
        position={[0, 0.55, -1.15]}
      />

      <primitive
        object={computer.scene}
        scale={macbookScale}
        position-y={macbookPositionY}
      >
              <Html
              transform
              wrapperClass="htmlScreen"
              distanceFactor={1.17}
              position={[0, 1.56, -1.4]}
              rotation-x={-0.256}
            >
              <iframe src="https://mypersonalportfolio02.netlify.app/" />
            </Html>
      </primitive>

      <Text
        font="./bangers-v20-latin-regular.woff"
        fontSize={textSize}
        position={textPosition}
        rotation-y={isMobile ? -0.75 : -1.25 }
        maxWidth={2}
        textAlign="center"
      >
        WASID ANSARI
      </Text>
    </group>
  </Float>
</PresentationControls>


    </>
  )
}

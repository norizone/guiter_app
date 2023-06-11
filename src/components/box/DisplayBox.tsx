import { usePlayer } from "@/hooks/useRhythmPlayer"


export const DisplayBox = () => {
  const {Box} = usePlayer()
  return (
    <div><Box/></div>
  )
}
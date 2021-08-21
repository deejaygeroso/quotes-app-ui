/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { EffectCallback, useEffect } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useOutsideAlerter = (ref: any, onClickOutside: () => void, isVisible: boolean): void => {
  const mq = window.matchMedia('(min-width: 768px)')
  useEffect((): ReturnType<EffectCallback> => {
    if (mq.matches) {
      const handleClickOutside = (event: MouseEvent): void => {
        if (ref.current && !ref.current.contains(event.target) && isVisible) {
          onClickOutside()
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return (): void => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [ref, mq])
}

export default useOutsideAlerter

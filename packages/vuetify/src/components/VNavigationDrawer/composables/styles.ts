// Composables
import { useBackgroundColor } from '@/composables/color'

// Utilities
import { unref } from 'vue'

// Types
import type {
  CSSProperties,
  MaybeRef,
} from 'vue'
import { useConvertToUnit } from './helpers'
import type { VNavigationDrawer as Props } from '../VNavigationDrawer'

const iconSizes = {
  default: '1.5em',
  large: '1.75em',
  small: '1.25em',
  'x-large': '2em',
  'x-small': '1em',
}

// -------------------------------------------------- Drawer //
export interface UseDrawerStyles {
  (
    options: {
      isMouseDown?: MaybeRef<boolean>
      maxWidth?: Props['maxWidth']
      minWidth?: Props['minWidth']
      rail?: Props['rail']
      railWidth?: Props['railWidth']
      resizedWidth: MaybeRef<string | number | undefined>
      widthSnapBack?: boolean
    }
  ): CSSProperties
}

export const useDrawerStyles: UseDrawerStyles = options => {
  const { isMouseDown, maxWidth, minWidth, rail, railWidth, resizedWidth, widthSnapBack } = options

  if (rail) {
    return {}
  }

  let widthValue = rail ? railWidth : unref(resizedWidth)

  if (!widthSnapBack) {
    if (parseInt(widthValue as string) >= parseInt(maxWidth as string)) {
      widthValue = parseInt(maxWidth as string)
    }

    if (parseInt(widthValue as string) <= parseInt(minWidth as string)) {
      widthValue = parseInt(minWidth as string)
    }
  }

  return {
    transitionDuration: unref(isMouseDown) ? '0s' : '.2s',
    width: useConvertToUnit({ value: widthValue as string }) as string,
  }
}

// -------------------------------------------------- Handle //
export interface UseHandleContainerStyles {
  (
    options: {
      borderWidth?: Props['handleBorderWidth']
      handleColor?: string | false | null | undefined
      iconSize?: string | false | null | undefined
      position?: Props['handlePosition']
    }
  ): CSSProperties
}

export const useHandleContainerStyles: UseHandleContainerStyles = options => {
  const { borderWidth, handleColor, iconSize, position } = options

  const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor({ color: handleColor }, 'color')

  if (position === 'border') {
    console.log(backgroundColorClasses.value)
    console.log(backgroundColorStyles.value)

    return {
      ...backgroundColorStyles.value,
      height: '100%',
      width: useConvertToUnit({ value: borderWidth as string }) as string,
    }
  }

  const dimensions = iconSizes[iconSize as string]

  return {
    backgroundColor: 'transparent',
    height: dimensions,
    width: dimensions,
  }
}

// Components
import { VIcon } from '@/components/VIcon'

// Composables
import { useHandleContainerStyles } from './composables/styles'
import { useBackgroundColor } from '@/composables/color'

// Utilities
import { computed } from 'vue'
import {
  // convertToUnit,
  genericComponent,
  propsFactory,
  useRender,
} from '@/util'

// Types
import type { PropType } from 'vue'
import type { HandlePosition } from './VNavigationDrawer'
import type { IconValue } from '@/composables/icons'

export type EmitEventNames = 'handle:click' |'handle:dblclick' |
'handle:drag' | 'handle:mousedown' |
'handle:mouseup' | 'handle:touchend' |
'handle:touchmove' | 'handle:touchstart';

export type VNavigationDrawerHandleProps = {
  borderWidth?: number | string
  color?: string | undefined
  icon?: IconValue | undefined
  iconSize?: string | undefined
  position?: {
    type: HandlePosition
    default: 'center'
  }
}

// type VNavigationDrawerHandleSlotProps = {
// }

export type VNavigationDrawerHandleSlots = {
  handle: never
}

export const makeVNavigationDrawerHandleProps = propsFactory({
  borderWidth: [Number, String],
  color: String,
  icon: String as PropType<IconValue | undefined>,
  iconSize: String,
  parentLocation: String,
  position: {
    type: String as PropType<HandlePosition>,
    default: 'center',
  },
}, 'VNavigationDrawerHandle')

export const VNavigationDrawerHandle = genericComponent<VNavigationDrawerHandleSlots>()({
  name: 'VNavigationDrawerHandle',

  props: makeVNavigationDrawerHandleProps(),

  emits: {
    'handle:click': (val: Event) => null,
    'handle:dblclick': (val: Event) => null,
    'handle:drag': (val: MouseEvent | TouchEvent) => null,
    'handle:mousedown': (val: MouseEvent) => null,
    'handle:mouseup': (val: MouseEvent) => null,
    'handle:touchend': (val: TouchEvent) => null,
    'handle:touchmove': (val: TouchEvent) => null,
    'handle:touchstart': (val: TouchEvent) => null,
  },

  setup (props, { slots, emit }) {
    // const slotProps = computed(() => ({
    // } satisfies VNavigationDrawerHandleSlotProps))

    const { backgroundColorClasses } = useBackgroundColor({ color: props.color }, 'color')
    const backgroundColor = computed(() => props.position === 'border' ? backgroundColorClasses.value : '')

    // const handleEvents: { mouseUp: boolean, mouseDown: boolean } = {
    //   mouseDown: false,
    //   mouseUp: true,
    // }

    // -------------------------------------------------- Handle Events //

    // ------------------------- Click & DoubleClick //
    function handleClick (e: Event): void {
      emit('handle:click', e)
    }

    function handleDoubleClick (e: Event): void {
      emit('handle:dblclick', e)
    }

    // ------------------------- MouseDown & Touchstart //
    // function handleStart () {
    // }

    function handleMouseDown (e: MouseEvent) {
      emit('handle:mousedown', e)
    }

    function handleTouchstart (e: TouchEvent) {
      emit('handle:touchstart', e)
    }

    // ------------------------- MouseUp & Touchend //
    // function handleEnd () {
    // }

    function handleMouseUp (e: MouseEvent): void {
      emit('handle:mouseup', e)
    }

    function handleTouchend (e: TouchEvent) {
      emit('handle:touchend', e)
    }

    // -------------------------------------------------- Misc Events //
    // function removeListeners(): void {
    //   document.removeEventListener('mouseup', handleMouseUp, false);
    //   document.removeEventListener('mousemove', mouseResize, false);
    //   document.removeEventListener('touchend', handleTouchend, false);
    //   document.removeEventListener('touchstart', handleTouchstart, false);
    // }

    // -------------------------------------------------- Render //
    useRender(() => {
      return (
        <>
          <div
            class={[
              'v-navigation-drawer__handle',
              'v-navigation-drawer__handle-container',
              `v-navigation-drawer__handle-position-${props.position}`,
              `v-navigation-drawer__handle-parent-${props.parentLocation}`,
              // backgroundColor.value,
            ]}
            onClick={ handleClick }
            onDblclick={ handleDoubleClick }
            onMousedown={ handleMouseDown }
            onMouseup={ handleMouseUp }
            onTouchend={ handleTouchend }
            onTouchstart={ handleTouchstart }
            style={
              useHandleContainerStyles({
                handleColor: props.color,
                borderWidth: props.borderWidth,
                iconSize: props.iconSize,
                position: props.position,
              })
            }
          >
            { slots.handle && (
              <div class="v-navigation-drawer__handle-slot">
                { slots.handle?.() }
              </div>
            )}

            { props.position !== 'border' && !slots.handle && (
              <VIcon
                class={[
                  'v-navigation-drawer__handle-icon',
                  `v-navigation-drawer__handle-icon-${props.position}-${props.parentLocation}`,
                ]}
                color={ props.color }
                icon={ props.icon }
                size={ props.iconSize }
              />
            )}
          </div>
        </>
      )
    })
  },
})

export type VNavigationDrawerHandle = InstanceType<typeof VNavigationDrawerHandle>

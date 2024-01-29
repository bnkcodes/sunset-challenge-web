import React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Cross1Icon } from '@radix-ui/react-icons'
import { cn } from '../../app/utils/cn'

type TriggerElement = React.ElementRef<typeof DialogPrimitive.Trigger>
type TriggerProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>

const Trigger = React.forwardRef<TriggerElement, TriggerProps>((props, ref) => {
  const { asChild = true, ...triggerProps } = props
  return <DialogPrimitive.Trigger {...triggerProps} asChild={asChild} ref={ref} />
})

type ContentElement = React.ElementRef<typeof DialogPrimitive.Content>
type ContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>

const Content = React.forwardRef<ContentElement, ContentProps>((props, ref) => {
  const { children, className, ...contentProps } = props
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 px-3 grid h-screen w-full place-items-center bg-gray-900/40">
        <DialogPrimitive.Content
          {...contentProps}
          className={cn(
            'relative w-full max-w-[450px] overflow-auto rounded-[16px] bg-white p-6 shadow-sm data-[state=open]:animate-content-show',
            className,
          )}
          ref={ref}
        >
          {children}
          <DialogPrimitive.Close className="absolute right-6 top-6 flex items-center justify-center">
            <Cross1Icon className='w-4 h-4' />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Overlay>
    </DialogPrimitive.Portal>
  )
})

type BodyElement = React.ElementRef<'div'>
type BodyProps = React.ComponentPropsWithoutRef<'div'>

const Body = React.forwardRef<BodyElement, BodyProps>((props, ref) => {
  const { children, className, ...bodyProps } = props
  return (
    <div
      className={cn('flex flex-col items-center justify-center gap-6 pt-12', className)}
      {...bodyProps}
      ref={ref}
    >
      {children}
    </div>
  )
})

type TitleElement = React.ElementRef<typeof DialogPrimitive.Title>
type TitleProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>

const Title = React.forwardRef<TitleElement, TitleProps>((props, ref) => {
  const { className, ...titleProps } = props
  return (
    <DialogPrimitive.Title
      className={cn(
        'max-w-[18ch] text-center text-[20px] font-bold leading-[24px] tracking-[-2%] text-gray-800',
        className,
      )}
      {...titleProps}
      ref={ref}
    />
  )
})

type DescriptionElement = React.ElementRef<typeof DialogPrimitive.Description>
type DescriptionProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>

const Description = React.forwardRef<DescriptionElement, DescriptionProps>((props, ref) => {
  const { className, ...descriptionProps } = props
  return (
    <DialogPrimitive.Description
      className={cn('text-center text-gray-700', className)}
      {...descriptionProps}
      ref={ref}
    />
  )
})

type FooterElement = React.ElementRef<'div'>
type FooterProps = React.ComponentPropsWithoutRef<'div'>

const Footer = React.forwardRef<FooterElement, FooterProps>((props, ref) => {
  const { className, ...footerProps } = props
  return <div className={cn('mt-10 flex gap-3', className)} {...footerProps} ref={ref} />
})

type CancelElement = React.ElementRef<typeof DialogPrimitive.Close>
type CancelProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>

const Cancel = React.forwardRef<CancelElement, CancelProps>((props, ref) => {
  const { type = 'button', className, ...closeProps } = props

  return (
    <DialogPrimitive.Close
      type={type}
      className={cn(
        'h-12 flex-1 rounded-md border-[2px] border-[#DADADB] text-[15px] font-bold leading-[18px] text-gray-800 shadow-none transition-shadow duration-300 hover:shadow-lg',
        className,
      )}
      {...closeProps}
      ref={ref}
    />
  )
})

type SubmitElement = React.ElementRef<'button'>
type SubmitProps = React.ComponentPropsWithoutRef<'button'>

const Submit = React.forwardRef<SubmitElement, SubmitProps>((props, ref) => {
  const { type = 'submit', className, ...submitProps } = props

  return (
    <button
      type={type}
      className={cn(
        'h-12 w-full flex-1 rounded-md bg-red-500 text-[15px] font-bold leading-[18px] text-white transition-all duration-300 hover:bg-brand-red/90 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed',
        className,
      )}
      {...submitProps}
      ref={ref}
    />
  )
})

export const Dialog = Object.assign(
  {},
  {
    Root: DialogPrimitive.Root,
    Trigger,
    Content,
    Body,
    Title,
    Description,
    Footer,
    Cancel,
    Submit,
  },
)
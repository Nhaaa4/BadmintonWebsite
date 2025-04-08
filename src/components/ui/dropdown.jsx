/* eslint-disable no-unused-vars */
"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "../../lib/utils"

const Dropdown = React.forwardRef(({ className, children, ...props }, ref) => {
  const [open, setOpen] = React.useState(false)
  const dropdownRef = React.useRef(null)

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div ref={dropdownRef} className={cn("relative inline-block text-left", className)} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === DropdownTrigger) {
          return React.cloneElement(child, {
            onClick: () => setOpen(!open),
            "aria-expanded": open,
          })
        }
        if (React.isValidElement(child) && child.type === DropdownContent) {
          return React.cloneElement(child, {
            open,
          })
        }
        return child
      })}
    </div>
  )
})
Dropdown.displayName = "Dropdown"

const DropdownTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronDown className="ml-2 h-4 w-4" />
  </button>
))
DropdownTrigger.displayName = "DropdownTrigger"

const DropdownContent = React.forwardRef(({ className, open, children, align = "center", ...props }, ref) => {
  if (!open) return null

  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80",
        align === "center" && "left-1/2 -translate-x-1/2",
        align === "start" && "left-0",
        align === "end" && "right-0",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
})
DropdownContent.displayName = "DropdownContent"

const DropdownItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    {children}
  </button>
))
DropdownItem.displayName = "DropdownItem"

const DropdownSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
))
DropdownSeparator.displayName = "DropdownSeparator"

export { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownSeparator }


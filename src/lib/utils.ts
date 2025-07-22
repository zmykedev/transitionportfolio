import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Import only specific lodash functions instead of the entire library
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Export only the lodash functions we actually use
export { debounce, throttle, isEmpty, isEqual }

import { useEffect, useState } from 'react'
import clsx from 'clsx'

import { FalseChecker, TrueChecker } from '../../assets/icons'

type PasswordCriteria = {
  label: string
  test: RegExp
}

const criteriaList: PasswordCriteria[] = [
  {
    label: '8 a 20 caracteres',
    test: /^.{8,20}$/,
  },
  {
    label: 'Pelo menos uma letra maiúscula',
    test: /[A-Z]/,
  },
  {
    label: 'Pelo menos uma letra minúscula',
    test: /[a-z]/,
  },
  {
    label: 'Pelo menos um número',
    test: /\d/,
  },
  {
    label: 'Pelo menos 1 caractere especial (ex: *, $, #, @...)',
    test: /[$&+,:;=?@#|'<>.^*()%!-]/,
  },
]

type PasswordCheckerProps = {
  password: string,
  className: string
}

export default function PasswordChecker({ password, className }: PasswordCheckerProps) {
  const [passwordStrength, setPasswordStrength] = useState<boolean[]>(
    Array(criteriaList.length).fill(false),
  )

  useEffect(() => {
    const strengths = criteriaList.map((criteria) => criteria.test.test(password))
    setPasswordStrength(strengths)
  }, [password])

  return (
    <div className={className}>
      <ul className="flex flex-col items-start justify-start space-y-2">
        {criteriaList.map((criteria, index) => (
          <li key={index} className="flex flex-row items-center justify-start space-x-1">
            <div>{passwordStrength[index] ? <TrueChecker /> : <FalseChecker />}</div>
            <p
              className={clsx(
                'text-[12px] leading-[19.2px]',
                passwordStrength[index]
                  ? 'font-normal text-[#B5B5B6]'
                  : 'font-medium text-[#686869]',
              )}
            >
              {criteria.label}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
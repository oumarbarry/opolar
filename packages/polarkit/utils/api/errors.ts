import type { ValidationError } from "@polar-sh/sdk"
import { ResponseError } from "@polar-sh/sdk"

type ValidationErrorsMap = Record<string, string[]>

export function getValidationErrorsMap(errors: ValidationError[]): ValidationErrorsMap {
  return errors.reduce<ValidationErrorsMap>((map, error) => {
    const loc = error.loc.slice(1).join(".")

    if (map[loc]) {
      return {
        ...map,
        [loc]: [...map[loc], error.msg],
      }
    }
    return {
      ...map,
      [loc]: [error.msg],
    }
  }, {})
}

export interface DetailError {
  detail: string
  type: "BadRequest" | string
}

export async function toDetailError(e: any): Promise<DetailError | undefined> {
  if (!(e instanceof ResponseError)) return undefined

  const json = await e.response.json()
  if (json.detail && json.type)
    return json as DetailError

  return undefined
}

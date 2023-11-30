import { PostHog } from "posthog-node"

export default function usePosthog() {
  let client: PostHog | null

  function configure() {
    if (!process.env.POSTHOG_PROJECT_API_KEY) {
      client = null
      return
    }

    client = new PostHog(process.env.POSTHOG_PROJECT_API_KEY)

    if (process.env.POLAR_TESTING)
      client.disable()
    if (process.env.POLAR_DEBUG)
      client.debug(true)
  }

  const _get_common_properties = () => ({ _environment: process.env.POLAR_ENV })

  const _get_user_properties = (user: any) => ({
    username: user.username,
    email: user.email,
  })

  function capture(distinctId: string, event: string, properties: { [key: string]: any } | null = null) {
    if (!client)
      return

    client.capture({
      distinctId,
      event,
      properties: { ..._get_common_properties(), ...(properties || {}) },
    })
  }

  function anonymousEvent(event: string, properties: { [key: string]: any } | null = null) {
    capture("polar_anonymous", event, { ..._get_common_properties(), ...(properties || {}) })
  }

  function userEvent(user: any, event: string, properties: { [key: string]: any } | null = null) {
    capture(user.posthogDistinctId, event, { ..._get_common_properties(), $set: _get_user_properties(user), ...(properties || {}) })
  }

  function identify(user: any) {
    if (!client)
      return

    client.identify({ distinctId: user.posthogDistinctId, properties: { ..._get_common_properties(), ..._get_user_properties(user) } })
  }

  return {
    configure,
    capture,
    anonymousEvent,
    userEvent,
    identify,
  }
}

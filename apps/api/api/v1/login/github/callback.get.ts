import { OAuthRequestError } from "@lucia-auth/oauth"

export default defineEventHandler(async (event) => {
  const storedState = getCookie(event, "github_oauth_state")

  const { state, code } = await getValidatedQuery(event, z.object({ state: z.string(), code: z.string() }).parse)

  // validate state
  if (!storedState || !state || storedState !== state || !code) {
    return sendError(
      event,
      createError({
        statusCode: 400,
      }),
    )
  }

  try {
    const { getExistingUser, githubUser, createUser } = await githubAuth.validateCallback(code)

    const getUser = async () => {
      const existingUser = await getExistingUser()
      if (existingUser) return existingUser

      const user = await createUser({ attributes: { username: githubUser.login } })
      return user
    }

    const user = await getUser()

    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    })

    const authRequest = auth.handleRequest(event)
    authRequest.setSession(session)

    return sendRedirect(event, "/") // redirect to profile page
  }
  catch (e) {
    if (e instanceof OAuthRequestError) throw createError({ statusCode: 400 })

    throw createError({ statusCode: 500 })
  }
})

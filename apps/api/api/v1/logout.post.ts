export default defineEventHandler(async (event) => {
  const authRequest = auth.handleRequest(event)

  const session = await authRequest.validate()
  if (!session) throw Unauthorized

  await auth.invalidateSession(session.sessionId)

  authRequest.setSession(null)

  return sendRedirect(event, "/login")
})

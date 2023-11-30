const auth = defineRequestMiddleware((event) => {
  event.context.auth = { name: "admin" }
})

export default defineEventHandler({
  onRequest: auth,
  async handler(event) {
    // if (!auth.user) throw Unauthorized

    const org = ""

    if (!org) throw ResourceNotFound

    const checkIfUserIsMember = ""
    if (!checkIfUserIsMember) throw Unauthorized

    const repo = ""
    if (!repo) throw ResourceNotFound

    const version = "unknown"

    if (getRequestHeader(event, "x-polar-agent")) {

    }
  },
})

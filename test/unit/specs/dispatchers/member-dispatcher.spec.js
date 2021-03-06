describe('member dispatcher', () => {
  let subject, dispatchProvider, publish

  beforeEach(() => {
    dispatchProvider = td.replace('../../../../src/providers/dispatch-provider')
    publish = td.func()
    td.when(dispatchProvider.getInstance()).thenReturn({ publish })
    subject = require('../../../../src/dispatchers/member-dispatcher')
  })

  describe('publishClanMember', () => {
    beforeEach(async () => {
      const promise = td.function()
      td.when(publish(td.matchers.anything())).thenReturn({ promise })
      td.when(promise()).thenResolve()

      const member = {}
      await subject.publishClanMember(member)
    })

    it('publishes the member', () => {
      const expectedMessage = {
        TopicArn: 'clan-member-topic',
        Message: JSON.stringify({})
      }
      td.verify(publish(expectedMessage))
    })
  })
})

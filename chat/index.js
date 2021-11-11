/* global render h on */
var messages = [];
var username = "testUser";
on("callback", function(e) {
  if (e.callback == "send") {
    messages.push({ body: e.data.message, username: username });
    console.log(messages);
    console.log(
      messages.map(function(e) {
        return e.body;
      })
    );
    update(true);
  }
});
function update(clear) {
  var inputprops = {
    type: "text",
    class: "form-control",
    name: "message"
  };
  if (clear) inputprops.value = "";
  render(
    h(
      "div",
      {
        class: "d-flex flex-column  h-100"
      },
      h(
        "main",
        {
          class: "flex-grow-1 overflow-hidden"
        },
        messages.map(function(message) {
          return h(
            "div",
            { class: "message" },
            h("b", { class: "username" }, message.username),
            h("span", { class: "messageBody" }, " " + message.body)
          );
        })
      ),
      h(
        "footer",
        {},
        h(
          "form",
          {
            class: "input-group mb-0",
            "data-events": {
              submit: {
                callback: "send",
                preventDefault: true,
                withData: true
              }
            }
          },
          h("input", inputprops),
          h(
            "button",
            {
              type: "submit",
              class: "btn btn-primary"
            },
            "Send"
          )
        )
      )
    )
  );
}
update();

# Day 27 hints

Use only when you are stuck — the learning happens in the attempt.

1. Put one listener on the list. Check the event target, then use `closest` to find its task.
2. `FormData.get` returns `FormDataEntryValue` or `null`. Narrow before using it as text.
3. Check `ctrlKey` or `metaKey` so the shortcut works across Windows/Linux and macOS.
4. Build a `FormValues` object only after checking the required entries are strings.
5. For multiple actions in one list, store the intended action in a `data-*` attribute and read it after the `closest` guard.
6. A `File` value is a valid `FormDataEntryValue`; handle the non-string case deliberately, never by asserting it away.
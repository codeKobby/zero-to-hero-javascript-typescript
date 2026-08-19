# Day 27 worked solutions

Read these only after a genuine attempt. Compare your reasoning, not just the syntax.

## Level 1

1. The parent listener is registered once and catches clicks that bubble from items created later — no new listener is needed when an item is added.
2. `FormData` keys come from each control's `name` attribute; an unnamed control is not included in the submitted data.
3. `preventDefault` stops the browser's default action (navigation); `stopPropagation` stops the event from bubbling. They are independent choices.
4. A file input contributes a `File` object as its entry, so `FormDataEntryValue` is `string | File`.
5. `event.target` is a generic `EventTarget` and the list may contain non-button elements, so `instanceof` guards must run before `closest` is used.
6. Both starter pages remove delegated tasks, submit names, and trigger the shortcut; `npm run check` passes.

## Level 2

```ts
type FormValues = { name: string; email: string }

function readFormValues(form: HTMLFormElement): FormValues | null {
  const data = new FormData(form)
  const name = data.get('name')
  const email = data.get('email')

  if (typeof name !== 'string' || typeof email !== 'string' || name.trim() === '') {
    return null
  }

  return { name: name.trim(), email: email.trim() }
}

list.addEventListener('click', (event: MouseEvent) => {
  if (!(event.target instanceof HTMLButtonElement)) return
  const item = event.target.closest('.task')
  if (item instanceof HTMLLIElement) item.remove()
})

document.addEventListener('keydown', (event: KeyboardEvent) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
    event.preventDefault()
    output.textContent = 'Draft shortcut triggered.'
  }
})
```

The parent listener works for tasks added after the listener was registered. The runtime checks prevent invalid DOM or `FormData` values from entering the typed application state.

## Level 3

```ts
// 1. The selective delegate
list.addEventListener('click', (event: MouseEvent) => {
  if (!(event.target instanceof HTMLButtonElement)) return
  const item = event.target.closest('.task')
  if (!(item instanceof HTMLLIElement)) return

  const action = event.target.dataset.action
  if (action === 'remove') {
    item.remove()
  } else if (action === 'edit') {
    item.classList.add('is-editing')
  }
})
// <button type="button" data-action="remove">Remove</button>
// The action marker lives in the markup because it names the element's role;
// one delegated listener reads it after the closest guard proves ownership.

// 2. The validated form
function readFormValues(form: HTMLFormElement): FormValues | null {
  const data = new FormData(form)
  const name = data.get('name')
  const email = data.get('email')

  if (typeof name !== 'string' || name.trim() === '') {
    output.textContent = 'Name is required.'
    return null
  }
  if (typeof email !== 'string' || email.trim() === '') {
    output.textContent = 'Email is required.'
    return null
  }

  return { name: name.trim(), email: email.trim() }
}
// Each failure case gets its own message instead of one generic rejection,
// because a user can fix only one problem at a time.

// 3. The scoped shortcut
function openDialog(): void {
  document.addEventListener('keydown', handleDialogKeydown)
}

function closeDialog(): void {
  document.removeEventListener('keydown', handleDialogKeydown)
}

function handleDialogKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    closeDialog()
  }
}
// A globally registered, always-on shortcut hijacks browser and assistive
// technology keys for the whole page. Scoping it to the dialog's lifetime
// keeps the rest of the page untouched.

// 4. The file-aware entry
function readTextEntry(data: FormData, key: string): string | null {
  const entry = data.get(key)
  if (typeof entry !== 'string') return null
  return entry
}
// entry may be null or a File; both are rejected here. A File cannot be
// assigned to a string, so the only honest path is to check and return null.
```

Delegation and forms now share one rule: prove ownership of the target with `closest`, then read the value — and narrow every `FormData` entry before it enters typed state.
type ContactEvent = {
  action: 'submit_form'
  category: 'Contact'
  label: string
  value: string
}

type ClickEvent = {
  action: 'click'
  category: 'Other'
  label: string
  value: string
}

export type Event = ContactEvent | ClickEvent
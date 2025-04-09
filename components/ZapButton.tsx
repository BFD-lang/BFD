// auto-generated ZapButton

export function ZapButton({ model, transition, id }: {
  model: string
  transition: string
  id: number | string
}) {
  const handleClick = async () => {
    await fetch(`/api/${model}s/${transition}?id=${id}`, { method: "POST" })
    location.reload()
  }

  return (
    <button onClick={handleClick}>
      {transition}
    </button>
  )
}
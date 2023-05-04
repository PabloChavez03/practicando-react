import { Badge, Button, Card, TextInput, Title } from "@tremor/react"
import { useState } from "react"
import { useUserActions } from "../hooks/useUserActions"

export function CreateNewUser() {
	const { addNewUser } = useUserActions()
	const [result, setResult] = useState<'ok' | 'error' | null>(null)

	const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault()

		const formData = new FormData(evt.currentTarget)
		setResult(null)
		const name = formData.get("name") as string
		const email = formData.get("email") as string
		const github = formData.get("github") as string

		if (!name || !email || !github) {
			setResult('error')
			return
		}

		const dataUser = {
			name, email, github
		}

		addNewUser(dataUser)

		setResult('ok')

		evt.currentTarget.reset()
	}

	return (
		<Card style={{ marginTop: "16px" }}>
			<Title>Create New User</Title>

			<form onSubmit={handleSubmit} className="">
				<TextInput name="name" placeholder="Aquí el nombre" />
				<TextInput name="email" placeholder="Aquí el email" />
				<TextInput name="github" placeholder="Aquí el usuario de GitHub" />

				<div>
					<Button type="submit" style={{ marginTop: "16px" }}>
						Crear usuario
					</Button>
					<span>
						{result === 'ok' && <Badge color="green">Usuario creado correctamente</Badge>}
						{result === 'error' && <Badge color="red">Por favor, rellena todos los campos</Badge>}
					</span>
				</div>
			</form>
		</Card>
	)
}
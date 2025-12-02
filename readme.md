# Fake API pour la prépa UAA5

## Utilisation
Cloner le projet et ouvrir un terminal dans le dossier
```
npm i
npm start
```
Cela lancera une WebAPI sur le port 8080 de votre machine.

## Routes disponible

### (GET) /api/destination
Permet d'obtenir la liste des destinations.

### Parametre dans l'url (query parameter) :
```
limit (number) : Nombre d'élément renvoyer (par defaut 5)  
offset (number) : Nombre d'élément ignoré (par defaut 0)
```

Exemple : 
- Les dix premieres destinations  
  `/api/destination?limit=10`
- Cinq destinations en passant les 5 premieres  
  `/api/destination?offset=5&limit=5`

### Exemple de réponse : 
```json
[
	{
		"id": 1,
		"name": "Kyoto",
		"shortDescription": "Ville japonaise empreinte de temples et traditions.",
		"country": "Japon",
		"slug": "kyoto-japon"
	},
	{
		"id": 2,
		"name": "Reykjavik",
		"shortDescription": "Capitale islandaise entourée de paysages volcaniques.",
		"country": "Islande",
		"slug": "reykjavik-islande"
	},
    ...
]
```

### (GET) /api/destination/:id
Permet d'obtenir les détails d'une destination par son id.

#### Exemple de réponse : 
```json
{
	"id": 1,
	"name": "Kyoto",
	"shortDescription": "Ville japonaise empreinte de temples et traditions.",
	"fullDescription": "Kyoto est une ancienne capitale du Japon, réputée pour ses temples bouddhistes, ses jardins zen et ses cérémonies du thé. Elle incarne l'harmonie entre modernité et traditions millénaires.",
	"country": "Japon",
	"estimatedBudget": {
		"min": 1200,
		"max": 2500
	},
	"imageUrl": "https://example.com/images/kyoto.jpg",
	"slug": "kyoto-japon",
	"travelPeriod": [
		{
			"start": "2025-03-01",
			"end": "2025-05-31"
		},
		{
			"start": "2025-10-01",
			"end": "2025-11-30"
		}
	]
}
```

### (GET) /api/destination/:id/comments
Permet d'obtenir les commentaires d'une destination.

#### Exemple de réponse : 
```json
[
	{
		"id": 1,
		"destinationId": 1,
		"author": "Della Duck",
		"message": "C'est trop bien le japon !"
	},
	...
]
```

### (POST) /api/destination/:id/comments
Permet d'envoyer un commentaire pour une destination.

#### Donnée à envoyer
```json
{
    "destinationId": 7,
    "author": "Zaza Vanderquack",
    "message": "Gouter la poutine !"
}
```

#### Exemple de réponse : 
```json
{
    "id": 5,
    "destinationId": 7,
    "author": "Zaza Vanderquack",
    "message": "Gouter la poutine !"
}
```


# Securitize Challenge
	
Para este challenge usé las siguientes herramientas y tecnologías

* **React**

El frontend esta desarrollado en ReactJS usando el módulo "create-react-app" como base y estructura inicial.
He usado componentes funcionales y Hooks.
Se encuentra bajo la carpeta "frontend"
* **Express**

El backend esta desarrollado con NodeJS framework ExpressJS, usando 
el módulo express-generator como base y estructura inicial
Se encuentra bajo la carpeta "backend"

  **Jest**

 Como herramienta de testing

 **Eslint**

 Como herramienta de calidad de código
Utilizo también Docker como herramienta de container y despliegue, habiendo un archivo Dockerfile en la carpeta raíz de cada proyecto y un docker-compose.yaml en la carpeta securitize para levantar ambos proyectos


**API**

Estos son los siguientes endpoints de API:

**Obtener balance en USD**

`curl --location --request GET 'http://localhost:3001/api/wallet/addresses/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae/balance/USD`

**Obtener balance en EUR**

`curl --location --request GET 'http://localhost:3001/api/wallet/addresses/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae/balance/EUR`

**Obtener balance en ETH**

`curl --location --request GET 'http://localhost:3001/api/wallet/addresses/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae/balance`

**Determinar si cuenta es vieja**

`curl --location --request GET 'http://localhost:3001/api/wallet/addresses/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae/old`

**Determinar si cuenta es vieja**

`curl --location --request GET 'http://localhost:3001/api/wallet/addresses/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae/old`

**Determinar valor moneda USD**

`curl --location --request GET 'http://localhost:3001/api/wallet/currencies/USD`

**Determinar valor moneda EUR**

`curl --location --request GET 'http://localhost:3001/api/wallet/currencies/EUR`

**Actualizar Moneda**

`curl --location --request PATCH 'http://localhost:3001/api/wallet/currencies/USD' \
--header 'Content-Type: application/json' \
--data-raw '{
    "value": 123.35
}'`

**Obtener monedas**

`curl --location --request GET 'http://localhost:3001/api/wallet/currencies`

**Sistema de Almacenamiento**

Las monedas se almacenar en memoria bajo la estructura 
`[{code: "ISO COUNTRY CODE", value: "DECIMAL VALUE"}]`


**Estructura del sitio**

En / se encuentra el Dashboard

**Cuenta**

Existe un input de texto para ingresar una cuenta de billetera Etherum y un  botón buscar, el cual traera el balance de la misma en tanto dicha cuenta sea válida

**Balance**

En esta sección se muestra el balance actual de una cuenta de acuerdo a la unidad seleccionada (pudiendo ser ETH, USD, EUR)

**Currency**

En esta sección se muestra la cotización en Euros y Dólares de acuerdo a la lista , donde 1 ETH = 1 USD o 1 EUR.
Se pued editar al clickear en el link de edicón


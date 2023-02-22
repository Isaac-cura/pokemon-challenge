# POKEMON CHALLENGE

![](public/assets/readme/cover.png)

Pokemon challenge es un proyecto hecho en Ionic 6 y Vue 3.
Entre sus funcionalidades principales se encuentran:

- Listar pokemons
- Paginar pokemons
- Mostrar caracteristicas detalladas de los pokemons
- Buscar pokemons por su nombre
- Filtrarlos por ciertas características

## ACERCA DEL CÓDIGO

- Se utilizó el patrón repository para inyectar servicios para las llamadas a las apis
- Se utilizó el patrón fachada(en escencia) para simplificar el uso de bibliotechas como chartjs
- Se manejaron las excepciones asiendo uso de eithers
- Se utilizó gitflow, con semantic commits
- Se utilizó semantig version taggeando y haciendo release de las diversas features del desarrollo
- Se desarrolló usando TDD

## INSTALACIÓN
Clonar el proyecto con http

```
https://github.com/Isaac-cura/pokemon-challenge.git
```

O con ssh

```
git@github.com:Isaac-cura/pokemon-challenge.git
```

luego instalamos las dependencias
```
npm install
```
para correr el servidor localmente
```
npm run serve

```
CONGRATULATIONS! 🎉

![](public/assets/readme/app-pokemon(2).png)



## TEST

El proyecto se desarrolló usando TDD(en principio) por lo cual cuenta con una suite de test nutrida


para correrlos debes usar el siguiente comando

```
npm run test:unit

```
## GENERAR APK PARA ANDROID 

Primero debemos generar un build de nuestro código
```
ionic build

```

Luego se debe copiar el output del build al proyecto de android studio

```
ionic cap copy

```

si se añadió un nuevo plugin al momento de realizar el compilado debes utilizar el siguiente comando
```
ionic cap sync

```

luego de esto se ejecuta este comando para abrir el proyecto en android studio y compilar desde ahí

```
ionic cap open android

```

@Todo  - compilar a travez de terminal sin tener que pasar por android estudio para tares de ci/cd

## Descarga el apk de la última versión

[app-debug.apk](public/assets/readme/app-debug.apk)

## Demo online
[Pokemon-Challenge](https://63f5b6c9d15fe746f333be0b--leafy-peony-70c0f2.netlify.app/)

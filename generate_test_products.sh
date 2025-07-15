#!/bin/bash

# Array de adjetivos y sustantivos para nombres de productos de fantasía
ADJECTIVES=("Mágico" "Encantado" "Místico" "Dorado" "Plateado" "Susurrante" "Radiante" "Brillante" "Antiguo" "Celestial")
NOUNS=("Amuleto" "Orbe" "Pergamino" "Poción" "Tomos" "Reliquia" "Cristal" "Amuleto" "Cetro" "Corona")

echo "Generando 10 productos de prueba..."

for i in {1..10}
do
  # Generar un precio aleatorio entre 10 y 100
  PRICE=$(( RANDOM % 91 + 10 ))

  # Seleccionar un adjetivo y un sustantivo aleatorios
  RAND_ADJ=${ADJECTIVES[$RANDOM % ${#ADJECTIVES[@]}]}
  RAND_NOUN=${NOUNS[$RANDOM % ${#NOUNS[@]}]}

  # Crear el nombre del producto
  PRODUCT_NAME="${RAND_ADJ} ${RAND_NOUN} de Maravilla ${i}"

  # Descripción corta del producto
  DESCRIPTION="Un artículo único y raro para tu colección. ¡No te lo pierdas!"

  echo "Creando producto: "${PRODUCT_NAME}" con precio $${PRICE}.00"
  # Ejecutar el comando de Shopify CLI para crear el producto
  shopify product create --title "${PRODUCT_NAME}" --price "${PRICE}.00" --body-html "${DESCRIPTION}"

  echo "--------------------------------------------------"
done

echo "¡Se han creado 10 productos de prueba con éxito!"

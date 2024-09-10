import { Gazela } from "../models/animais_zoo_model/Gazela.js";
import { Macaco } from "../models/animais_zoo_model/Macaco.js";
import { Leao } from "../models/animais_zoo_model/Leao.js";
import { Hipopotamo } from "../models/animais_zoo_model/Hipopotamo.js";
import { Leopardo } from "../models/animais_zoo_model/Leopardo.js";
import { Crocodilo } from "../models/animais_zoo_model/Crocodilo.js";
import { Savana } from "../models/recinto_zoo_models/Savana.js";
import { Floresta } from "../models/recinto_zoo_models/Floresta.js";
import { SavanaeRio } from "../models/recinto_zoo_models/Savana_e_Rio.js";
import { Rio } from "../models/recinto_zoo_models/Rio.js";
import { Recinto } from "../models/Recinto.js";


const habitates = [
  new Savana(),
  new Floresta(),
  new SavanaeRio(),
  new Rio(),
  new Recinto(5, "savana", 9, [new Leao()]),
];

const animais = [
  new Leao(),
  new Leopardo,
  new Crocodilo(),
  new Macaco(),
  new Hipopotamo(),
  new Gazela(),
];

export function localideal(animal, quantidade) {
  var recintosViaveis = [];
  if (!ainimaisSuport(animal)) {
    return { erro: "Animal inválido", recintosViaveis: false };
  } else if (quantidade <= 0) {
    return { erro: "Quantidade inválida", recintosViaveis: false };
  } else {
    const animalatual = getanimal(animal);
    const temthabitate = getbioma(animalatual, quantidade);
    const habitates = casosParticulares(animalatual, temthabitate, quantidade);

    if (habitates.length != 0) {
      habitates.forEach((element) =>
        recintosViaveis.push(
          `Recinto ${element.id} (espaço livre: ${getSpacoLivre(
            element.animaisatual,
            animalatual,
            element.tmTotal,
            quantidade
          )} total: ${element.tmTotal})`
        )
      );
      return { erro: false, recintosViaveis: recintosViaveis };
    } else {
      return { erro: "Não há recinto viável", recintosViaveis: false };

    }

  }
}

function ainimaisSuport(animal) {
  return animais.some((element) => element.especie === animal);
}

function getanimal(animal) {
  return animais.find((element) => element.especie === animal);
}

function getbioma(animal, quantidade) {
  var tempBiomas = habitates.filter(
    (habitate) =>
      animal.bioma.some((bioma) => habitate.bioma.includes(bioma)) &&
      seguranceAnimal(animal.tipo, habitate)
  );
  return tempBiomas.filter(bioma => !(getSpacoLivre(bioma.animaisatual, animal, bioma.tmTotal, quantidade) <= 0));

}

function seguranceAnimal(tipo, habitate) {
  return habitate.animaisatual.every((animais) => animais.tipo === tipo);
}

function casosParticulares(animal, habitates, quantidade) {
  var habitate = [];
  switch (animal.especie) {
    case "HIPOPOTAMO":
      habitates.forEach((e) => {
        getHabitatLength(e.animaisatual) + animal.tamanho * quantidade <=
          e.tmTotal &&
          e.animaisatual.forEach((element) => element.especie == "HIPOPOTAMO");
        habitate.push(e);
      });
      return habitate;
    case "MACACO":
      habitates.forEach((e) => {
        e.animaisatual.length + 1 > e.animaisatual.length;
        habitate.push(e);
      });
      return habitate;
    default:
      return habitates;
  }
}

function getHabitatLength(animais) {
  var cont = 0;
  for (const index in animais) {
    cont += animais[index].tamanho;
  }
  return cont;
}

function getSpacoLivre(animaisatual, animalatual, tamnahoTotal, quantidade) {
  var animaisREcinto = [];
  animaisREcinto.push(animalatual.especie);

  animaisatual.forEach((element) => {
    if (!animaisREcinto.includes(element.especie)) {
      animaisREcinto.push(element.especie);
    }
  });
  var quantVar = animaisREcinto.length >= 2 ? 1 : 0;

  return (
    tamnahoTotal -
    (getHabitatLength(animaisatual) +
      animalatual.tamanho * quantidade +
      quantVar)
  );
}

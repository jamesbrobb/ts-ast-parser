import {ClassDeclaration, isDecoratedWith, isPublic, PropertyDeclaration} from "../declarations";


export function isUIClass(classDeclaration: ClassDeclaration): boolean {
  return isDecoratedWith('Component', classDeclaration) ||
      isDecoratedWith('Directive', classDeclaration);
}

export function isInput(property: PropertyDeclaration): boolean {
  // add logic for input signal
  return isDecoratedWith('Input', property);
}

export function isOutput(property: PropertyDeclaration): boolean {
  // add logic for output signal
  return isDecoratedWith('Output', property);
}

export function getInputs(properties: PropertyDeclaration[]): PropertyDeclaration[] {
  return properties
    .filter(prop => isDecoratedWith('Input', prop))
}

export function getOutputs(properties: PropertyDeclaration[]): string[] {
  return properties
    .filter(prop => isDecoratedWith('Output', prop))
    .map(prop => prop.signature);
}

export function getPublicProperties(properties: PropertyDeclaration[]): string[] {
  return properties
    .filter(prop => isPublic(prop.name, prop))
    .filter(prop => !isDecoratedWith('Input', prop) && !isDecoratedWith('Output', prop))
    .map(prop => prop.signature);
}

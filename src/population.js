import * as THREE from 'three';
import * as CANNON from 'cannon';
import { Humanoid } from './humanoid';

export class Population {
    constructor(world, scene, populationSize, genomeLength, mutationRate, crossoverRate) {
        this.world = world;
        this.scene = scene;
        this.populationSize = populationSize;
        this.genomeLength = genomeLength;
        this.mutationRate = mutationRate;
        this.crossoverRate = crossoverRate;
        this.population = this.generateInitialPopulation();
    }

    // Generate an initial population with random genomes
    // Generate an initial population of humanoids
    generateInitialPopulation() {
        const population = [];
        for (let i = 0; i < this.populationSize; i++) {
            const humanoid = new Humanoid(this.world, this.scene);
            humanoid.fitness = null; // Initialize fitness
            population.push(humanoid);
        }
        return population;
    }

    updatePopulation() {
        for (let h in this.population) {
            this.population[h].update();
        }
    }

    fitnessFunction(humanoid) {
        return 1;
    }

    // Evaluate fitness of each individual
    evaluateFitness() {
        this.population.forEach(humanoid => {
            humanoid.fitness = this.fitnessFunction(humanoid);
        });
    }

    // Select parents using roulette wheel selection
    selectParents() {
        // // Calculate total fitness
        // const totalFitness = this.population.reduce((sum, individual) => sum + individual.fitness, 0);

        // // Calculate cumulative fitness
        // const cumulativeFitness = this.population.map((individual, index) => {
        //     return this.population.slice(0, index + 1).reduce((sum, individual) => sum + individual.fitness, 0) / totalFitness;
        // });

        // // Select two parents
        // const parents = [];
        // for (let i = 0; i < 2; i++) {
        //     const rand = Math.random();
        //     for (let j = 0; j < cumulativeFitness.length; j++) {
        //         if (rand < cumulativeFitness[j]) {
        //             parents.push(this.population[j]);
        //             break;
        //         }
        //     }
        // }
        // return parents;
    }

    // Perform crossover between two parents to produce offspring
    crossover(parent1, parent2) {
        // const offspring1 = [];
        // const offspring2 = [];
        // for (let i = 0; i < this.genomeLength; i++) {
        //     if (Math.random() < this.crossoverRate) {
        //         offspring1.push(parent2.genome[i]);
        //         offspring2.push(parent1.genome[i]);
        //     } else {
        //         offspring1.push(parent1.genome[i]);
        //         offspring2.push(parent2.genome[i]);
        //     }
        // }
        // return [{ genome: offspring1, fitness: null }, { genome: offspring2, fitness: null }];
    }

    // Mutate an individual's genome
    mutate(individual) {
        // for (let i = 0; i < this.genomeLength; i++) {
        //     if (Math.random() < this.mutationRate) {
        //         individual.genome[i] = Math.random();
        //     }
        // }
    }

    // Generate a new population
    generateNewPopulation() {
        // const newPopulation = [];
        // this.evaluateFitness();

        // // Keep the best individual (elitism)
        // const bestIndividual = this.population.reduce((best, current) => (current.fitness > best.fitness ? current : best), this.population[0]);
        // newPopulation.push(bestIndividual);

        // // Generate new individuals
        // while (newPopulation.length < this.populationSize) {
        //     const [parent1, parent2] = this.selectParents();
        //     let [offspring1, offspring2] = this.crossover(parent1, parent2);
        //     this.mutate(offspring1);
        //     this.mutate(offspring2);
        //     newPopulation.push(offspring1);
        //     if (newPopulation.length < this.populationSize) {
        //         newPopulation.push(offspring2);
        //     }
        // }

        // this.population = newPopulation;
    }
}
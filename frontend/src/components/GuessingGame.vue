<!-- GuessingGame.vue -->
<template>
    <div>
      <label for="character">Escolha um personagem:</label>
      <select v-model="selectedCharacter" @change="checkGuess">
        <option value="">Selecione um personagem</option>
        <option v-for="character in availableCharacters" :key="character.id" :value="character.name">{{ character.name }}</option>
      </select>
      <div v-if="feedback">
        <p>{{ feedback }}</p>
      </div>
      <div v-if="randomCharacter">
        <p><strong>Cheat:</strong> O personagem selecionado aleatoriamente é {{ randomCharacter.name }}.</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        selectedCharacter: '',
        characters: [],
        correctCharacter: {},
        feedback: '',
        randomCharacter: null // Inicializa com null
      };
    },
    mounted() {
      this.fetchCharacters();
      this.selectRandomCharacter();
    },
    methods: {
      async fetchCharacters() {
        try {
          const response = await axios.get('http://localhost:3000/onepiece');
          this.characters = Object.values(response.data);
        } catch (error) {
          console.error('Erro ao buscar os personagens:', error);
        }
      },
      selectRandomCharacter() {
        const randomIndex = Math.floor(Math.random() * this.characters.length);
        this.randomCharacter = this.characters[randomIndex];
      },
      async checkGuess() {
        if (!this.selectedCharacter) return;
  
        try {
          const response = await axios.get('http://localhost:3000/onepiece');
          this.correctCharacter = response.data.character;
  
          if (this.correctCharacter.name.toLowerCase() === this.selectedCharacter.toLowerCase()) {
            this.feedback = 'Você acertou!';
          } else {
            const differences = this.getDifferences(this.correctCharacter);
            this.feedback = `Você errou! Diferenças em relação a ${this.selectedCharacter}: ${differences.join(', ')}`;
          }
        } catch (error) {
          console.error('Erro ao verificar a resposta:', error);
        }
      },
      getDifferences(character) {
        const differences = [];
        if (character.position !== this.correctCharacter.position) {
          differences.push(`Posição: ${character.position}`);
        }
        if (character.devilFruit !== this.correctCharacter.devilFruit) {
          differences.push(`Fruta do Diabo: ${character.devilFruit}`);
        }
        if (character.haki.join(',') !== this.correctCharacter.haki.join(',')) {
          differences.push(`Haki: ${character.haki.join(', ')}`);
        }
        return differences;
      }
    },
    computed: {
      availableCharacters() {
        return this.characters.filter(character => character.name !== this.selectedCharacter);
      }
    }
  };
  </script>
  
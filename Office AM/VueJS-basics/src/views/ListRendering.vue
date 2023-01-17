<template>
  <h2>List Rendering:</h2>
  <h3 v-for="(name, index) in names" :key="index">{{ index }}. {{ name }}</h3>
  <br />
  <h2>List of Array of object Rendering:</h2>
  <h3 v-for="(name, index) in fullnames" :key="index">
    {{ index }} {{ name.first }} {{ name.last }}
  </h3>
  <br />
  <h2>Display list of nested array of objects:</h2>
  <div v-for="actor in actors" :key="actor.name">
    <h3>{{ actor.name }}</h3>
    <h4 v-for="movie in actor.movies" :key="movie">{{ movie }}</h4>
  </div>
  <br />
  <h2>Rendering values in object</h2>
  <h3 v-for="(value, key, index) in values" :key="value.name">
    {{ index }}. {{ key }}: {{ value }}
  </h3>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      names: ["akshay", "saurabh", "shivraj", "narayan"],
      fullnames: [
        { first: "Akshay", last: "Gawade" },
        { first: "Saurabh", last: "Gawade" },
        { first: "Shivraj", last: "Gawade" },
        { first: "Narayan", last: "Gawade" },
      ],
      actors: [
        { name: "Akshay Kumar", movies: ["one", "two"] },
        { name: "Di Caprio", movies: ["three", "four"] },
      ],
      values: {
        name: "Akshay",
        lastname: "Gawade",
        company: "AngularMinds",
      },
    };
  },
};
</script>

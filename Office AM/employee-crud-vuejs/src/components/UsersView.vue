<template>
  <div class="container my-4">
    <main>
      <div class="py-5">
        <h2>
          Candidates List
          <button @click="gotoadd" class="btn btn-primary float-end">
            Add Candidate
          </button>
        </h2>
      </div>

      <div class="row">
        <div class="col-12 ms-auto me-auto">
          <div class="card">
            <div class="card-body">
              <table class="table">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Number of Skills</th>
                  <th>Total Work Experience (in months)</th>
                  <th>Actions</th>
                </tr>
                <tr v-for="(user, i) in users" :key="i">
                  <td>{{ i + 1 }}</td>
                  <td>{{ `${user.firstname} ${user.lastname}` }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.skills.length }}</td>
                  <td>
                    <!-- {{ [1, 2, 3].reduce(add, 0) + " months" }} -->
                    {{
                      user.experience.reduce(function (sum, current) {
                        return sum + current.duration;
                      }, 0)
                    }}
                  </td>
                  <td>
                    <a @click="gotoEdit(i)">Edit</a>
                    <a @click="changestatus(i)" class="text-danger ms-2"
                      >delete</a
                    >
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";

export default {
  name: "UsersView",
  setup() {
    let users = ref([]);
    let status = ref(false);

    onMounted(async () => {
      let a = await JSON.parse(localStorage.getItem("users"));
      users.value = a;
      // console.log(users.value);
    });
    return {
      users,
      status,
    };
  },
  methods: {
    gotoEdit(i) {
      this.$router.push({ path: `/edituser/${i}`, params: { id: i } });
    },
    changestatus(i) {
      console.log(i);
      this.status = !this.status;
      let a = JSON.parse(localStorage.getItem("users"));
      a.splice(i, 1);
      // console.log(a);
      this.users = a;
      localStorage.setItem("users", JSON.stringify(a));
    },
    gotoadd() {
      this.$router.push("/add");
    },
  },
  // watch: {
  //   status() {
  //     console.log("status");
  //   },
  // },
};
</script>

<style lang="scss" scoped></style>

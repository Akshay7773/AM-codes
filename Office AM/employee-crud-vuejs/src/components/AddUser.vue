<template>
  <div>
    <div class="container my-4">
      <main>
        <div class="py-5 text-center">
          <h2>Add Candidate</h2>
        </div>

        <div class="row g-5">
          <div class="col-md-7 col-lg-8 ms-auto me-auto">
            <h4 class="mb-3">Basic Info</h4>
            <div class="row g-3">
              <div class="col-sm-6">
                <label class="form-label">First name</label>
                <input type="text" class="form-control" v-model="firstname" />
                <span v-if="v$.firstname.$error"
                  >{{ v$.firstname.required.$message }}
                </span>
              </div>

              <div class="col-sm-6">
                <label class="form-label">Last name</label>
                <input type="text" class="form-control" v-model="lastname" />
                <span v-if="v$.lastname.$error"
                  >{{ v$.lastname.required.$message }}
                </span>
              </div>
              <!-- for password validation -->
              <div class="col-sm-6">
                <label class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="password.pass"
                />
              </div>
              <div class="col-sm-6">
                <label class="form-label">Confirm Password</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="password.confirmPass"
                />
              </div>
              <div class="col-12">
                <label class="form-label">Gender</label>
                <div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="Male"
                      v-model="gender"
                    />
                    <label class="form-check-label">Male</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      value="Female"
                      class="form-check-input"
                      type="radio"
                      v-model="gender"
                    />
                    <label class="form-check-label">Female</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      value="Other"
                      class="form-check-input"
                      type="radio"
                      v-model="gender"
                    />
                    <label class="form-check-label">Other</label>
                  </div>
                </div>
              </div>

              <div class="col-12">
                <label class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  placeholder="you@example.com"
                  v-model="email"
                />
                <span v-if="v$.email.$error"
                  >{{ v$.email.required.$message }}
                </span>
              </div>

              <div class="col-12">
                <label class="form-label">Address</label>
                <textarea
                  class="form-control"
                  placeholder="1234 Main St"
                  v-model="address"
                ></textarea>
              </div>

              <div class="col-md-5">
                <label class="form-label">Country</label>
                <select v-model="country" class="form-select">
                  <option value="">Choose...</option>
                  <option>India</option>
                  <option>United States</option>
                </select>
              </div>

              <div class="col-md-4">
                <label class="form-label">State</label>
                <select v-model="state" class="form-select">
                  <option value="">Choose...</option>
                  <option>Maharashtra</option>
                  <option>Karnataka</option>
                </select>
              </div>

              <div class="col-md-3">
                <label class="form-label">Pin / Zip</label>
                <input type="text" class="form-control" v-model="pin" />
              </div>
            </div>

            <hr class="my-4" />

            <h4 class="mb-3">Professional Info</h4>

            <div class="row g-3">
              <div class="col-12">
                <label class="form-label">
                  Choose your skills
                  <span class="small text-muted">(min 3 skills)</span>
                </label>
                <div class="mb-3">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="Angular"
                      v-model="skills"
                    />
                    <label class="form-check-label">Angular</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="React"
                      v-model="skills"
                    />
                    <label class="form-check-label">React</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="Node.JS"
                      v-model="skills"
                    />
                    <label class="form-check-label">Node.JS</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="JavaScript"
                      v-model="skills"
                    />
                    <label class="form-check-label">JavaScript</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="Flutter"
                      v-model="skills"
                    />
                    <label class="form-check-label">Flutter</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="Java"
                      v-model="skills"
                    />
                    <label class="form-check-label">Java</label>
                  </div>
                </div>
              </div>
            </div>

            <div class="row gy-3">
              <div class="col-12">
                <label class="form-label">
                  <strong>
                    Experience
                    <span class="small text-muted">(min 2, max 5 items)</span>
                  </strong>
                </label>
                <div
                  v-for="(exp, index) in experience"
                  class="card mx-3 mt-3"
                  :key="exp.duration"
                >
                  <div class="card-body">
                    <h6 class="card-title text-muted mb-3">
                      Experience #{{ index + 1 }}
                      <a
                        class="float-end text-danger fw-normal"
                        @click="deleteExp(index)"
                        :style="
                          experience.length === 1
                            ? {
                                'pointer-events': 'none',
                                cursor: 'not-allowed',
                              }
                            : { cursor: 'pointer' }
                        "
                        >Remove</a
                      >
                    </h6>
                    <div class="row g-3">
                      <div class="col-6">
                        <label class="form-label">Company Name</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="experience[index].cName"
                        />
                      </div>
                      <div class="col-6">
                        <label class="form-label"
                          >Duration
                          <span class="text-muted">(in months)</span></label
                        >
                        <input
                          type="number"
                          class="form-control"
                          v-model="experience[index].duration"
                        />
                      </div>
                      <div class="col-12">
                        <label class="form-label"
                          >Describe your responsibilities</label
                        >
                        <textarea
                          class="form-control"
                          v-model="experience[index].resp"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <a disabled class="d-block mt-3" @click="addmore"
                  >Add more experience</a
                >
                <!-- style="pointer-events: none" -->
              </div>
            </div>

            <hr class="my-4" />

            <button @click="storeValue" class="btn btn-primary" type="submit">
              Save Candidate
            </button>
          </div>
        </div>
      </main>
    </div>
    <button @click="checkUsers">check users</button>
  </div>
  <router-link to="/users">Watchers Practice</router-link> |

  <router-view />
</template>

<script>
import { computed, reactive } from "vue";
import { toRefs } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
export default {
  setup() {
    const obj = reactive({
      firstname: "",
      lastname: "",
      password: {
        pass: "",
        confirmPass: "",
      },
      gender: "",
      email: "",
      address: "",
      country: "",
      state: "",
      pin: "",
      skills: [],
      experience: [
        { cName: "", duration: "", resp: "" },
        { cName: "", duration: "", resp: "" },
      ],
    });
    // for password we need computed property to check whether password and confirm password are same or n
    const rules = computed(() => {
      return {
        firstname: { required },
        lastname: { required },
        password: {
          pass: { required },
          confirmPass: { required, sameAs: sameAs(obj.password.pass) },
        },
        gender: { required },
        email: { required, email },
        address: { required },
        country: { required },
        state: { required },
        pin: { required },
      };
    });
    const v$ = useVuelidate(rules, obj);
    function addmore() {
      obj.experience.push({ cName: "", duration: "", resp: "" });
    }
    function deleteExp(index) {
      obj.experience.splice(index, 1);
    }
    function storeValue() {
      // console.log(this.v$.firstname.required.$message);

      let a = JSON.parse(localStorage.getItem("users"));
      let arr = [];
      if (a === null) {
        arr.push(obj);
      } else {
        arr = a;
        arr.push(obj);
        // mainArr = [...mainArr, obj];
      }
      this.v$.$validate();
      if (!this.v$.$error) localStorage.setItem("users", JSON.stringify(arr));
      else alert("Form validation failed!!");
    }

    return {
      ...toRefs(obj),
      addmore,
      deleteExp,
      storeValue,
      v$,
    };
  },

  methods: {
    checkUsers() {
      this.$router.push("/users");
    },
  },
};
</script>

<style lang="scss" scoped></style>

<template>
  <div>
    <h1>Book Details</h1>
    <div>
      <label for="title">Title:</label>
      <input v-model="book.title" id="title" type="text" />
    </div>
    <div>
      <label for="author">Author:</label>
      <input v-model="book.author" id="author" type="text" />
    </div>
    <div>
      <label for="description">Description:</label>
      <input v-model="book.description" id="description" type="text" style="width : 500px; height : 50px"/>
    </div>
    <div>
      <label for="quantity">Quantity:</label>
      <input v-model.number="book.quantity" id="quantity" type="number" />
    </div>

    <!-- Commit 버튼: 수정된 데이터를 Vuex 상태에 반영 -->
    <button @click="updateBook">Commit Changes</button>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    // 수정할 책 데이터를 reactive로 초기화
    const book = reactive({
      id: null,
      title: "",
      author: "",
      description: "",
      quantity: 0,
    });

    onMounted(() => {
      const bookId = parseInt(route.params.id, 10);
      const foundBook = store.state.books.find((b) => b.id === bookId);
      if (foundBook) {
        // 책 정보를 명시적으로 할당
        book.id = foundBook.id;
        book.title = foundBook.title;
        book.author = foundBook.author;
        book.description = foundBook.description;
        book.quantity = foundBook.quantity;
      }
    });

    // 수정된 updateBook 메서드
    const updateBook = () => {
      store.commit("updateBook", { ...book }); // book 객체 복사본 전달
      router.push("/"); // 수정 후 목록 페이지로 이동
    };

    return {
      book,
      updateBook,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
input {
  margin-bottom: 10px;
  padding: 5px;
}
button {
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}
</style>

<template>
  <div class="sidebar">
    <ul class="sidebar__list">
      <router-link
        class="sidebar__item"
        tag="li"
        to="/"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.96 8.10001H7.74001C7.24321 8.10001 7.20001 8.50231 7.20001 9.00001C7.20001 9.49771 7.24321 9.90001 7.74001 9.90001H12.96C13.4568 9.90001 13.5 9.49771 13.5 9.00001C13.5 8.50231 13.4568 8.10001 12.96 8.10001V8.10001ZM14.76 12.6H7.74001C7.24321 12.6 7.20001 13.0023 7.20001 13.5C7.20001 13.9977 7.24321 14.4 7.74001 14.4H14.76C15.2568 14.4 15.3 13.9977 15.3 13.5C15.3 13.0023 15.2568 12.6 14.76 12.6ZM7.74001 5.40001H14.76C15.2568 5.40001 15.3 4.99771 15.3 4.50001C15.3 4.00231 15.2568 3.60001 14.76 3.60001H7.74001C7.24321 3.60001 7.20001 4.00231 7.20001 4.50001C7.20001 4.99771 7.24321 5.40001 7.74001 5.40001ZM4.86001 8.10001H3.24001C2.74321 8.10001 2.70001 8.50231 2.70001 9.00001C2.70001 9.49771 2.74321 9.90001 3.24001 9.90001H4.86001C5.35681 9.90001 5.40001 9.49771 5.40001 9.00001C5.40001 8.50231 5.35681 8.10001 4.86001 8.10001ZM4.86001 12.6H3.24001C2.74321 12.6 2.70001 13.0023 2.70001 13.5C2.70001 13.9977 2.74321 14.4 3.24001 14.4H4.86001C5.35681 14.4 5.40001 13.9977 5.40001 13.5C5.40001 13.0023 5.35681 12.6 4.86001 12.6ZM4.86001 3.60001H3.24001C2.74321 3.60001 2.70001 4.00231 2.70001 4.50001C2.70001 4.99771 2.74321 5.40001 3.24001 5.40001H4.86001C5.35681 5.40001 5.40001 4.99771 5.40001 4.50001C5.40001 4.00231 5.35681 3.60001 4.86001 3.60001Z"
            fill="black"
          />
        </svg>
        <span class="item__title">Все задачи</span>
      </router-link>
      <router-link
        class="sidebar__item"
        v-for="folder in folders"
        :key="folder.id"
        tag="li"
        :to="`/folder/${folder.id}`"
      >
        <i class="item__icon" :style="{'background-color': folder.color}"></i>
        <span class="item__title">{{ folder.title }}</span>
        <span @click="remove(folder.id)" class="item__remove">
          <svg
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.87215 5.5L10.7129 1.65926C10.8952 1.47731 10.9977 1.23039 10.9979 0.972832C10.9982 0.715276 10.8961 0.468178 10.7141 0.285898C10.5321 0.103617 10.2852 0.00108525 10.0277 0.000857792C9.77011 0.000630336 9.52302 0.102726 9.34074 0.284685L5.5 4.12542L1.65926 0.284685C1.47698 0.102404 1.22976 0 0.971974 0C0.714191 0 0.466965 0.102404 0.284685 0.284685C0.102404 0.466965 0 0.714191 0 0.971974C0 1.22976 0.102404 1.47698 0.284685 1.65926L4.12542 5.5L0.284685 9.34074C0.102404 9.52302 0 9.77024 0 10.028C0 10.2858 0.102404 10.533 0.284685 10.7153C0.466965 10.8976 0.714191 11 0.971974 11C1.22976 11 1.47698 10.8976 1.65926 10.7153L5.5 6.87458L9.34074 10.7153C9.52302 10.8976 9.77024 11 10.028 11C10.2858 11 10.533 10.8976 10.7153 10.7153C10.8976 10.533 11 10.2858 11 10.028C11 9.77024 10.8976 9.52302 10.7153 9.34074L6.87215 5.5Z"
              fill="black"
            />
          </svg>
        </span>
      </router-link>
    </ul>
    <add-folder />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AddFolder from './AddFolder'

export default {
  name: 'AppSidebar',

  components: {
    AddFolder
  },

  computed: {
    ...mapState(['folders', 'todos'])
  },

  methods: {
    ...mapActions(['removeFolder', 'removeTodo']),
    remove (folderId) {
      const items = this.todos.filter(item => item.parent === folderId)

      this.removeFolder(folderId)
      items.forEach(item => {
        this.removeTodo(item)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  position: relative;
  width: 200px;
  padding: 30px 20px;
  &__list {
    margin-bottom: 20px;
  }
  &__item {
    padding: 8px 4px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    &:hover {
      cursor: pointer;
      background-color: #fff;
      box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.05);
      .item__remove {
        opacity: 1;
      }
    }
  }
  .item__title {
    margin-left: 5px;
    width: 160px;
    overflow:hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .item__icon {
    flex: 0 0 10px;
    height: 10px;
    border-radius: 50%;
  }
  .item__remove {
    transition: opacity 0.15s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    color: lighten(#f4f6f8, 2%);
    cursor: pointer;
    &:hover {
      color: darken(#f4f6f8, 2%);
      svg {
        opacity: 0.9;
      }
    }
    svg {
      width: 11px;
      height: 11px;
      opacity: 0.4;
    }
  }
}
.router-link-exact-active {
  background-color: #fff;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.05);
}
</style>

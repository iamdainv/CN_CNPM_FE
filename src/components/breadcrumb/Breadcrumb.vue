<template>
  <div v-if="breadcrumb.items.length > 0" class="breadcrumb">
    <div class="breadcrumb-content" style="background: #FFFFFF; padding: 12px 12px 0 12px; ">
      <div>
        <a-breadcrumb separator=">">
          <a-breadcrumb-item v-for="(item, index) in breadcrumb.items" :key="index">
            <router-link :to="{name: item.routeName}">{{ $t(item.title) }}</router-link>
          </a-breadcrumb-item>
        </a-breadcrumb>
        <h3 style="text-transform: uppercase; margin-bottom: 5px;">{{ $t(breadcrumb.pageName) }}</h3>
      </div>
      <slot name="menu">
        <div v-if="items.length" class="menu-level-3">
          <a-select
            v-model="option"
            @change="onChangeMenu"
            :disabled="disableMenu"
            class="breadcrumb-selection"
          >
            <a-select-option
              v-for="item in items"
              :key="item.value"
              :value="item.value">
              {{ item.text }}
            </a-select-option>
          </a-select>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Breadcrumb',
  props: {
    extraItems: {
      type: Array,
      required: false,
      default: () => []
    },
    menuItems: {
      type: Array,
      required: false,
      default: () => []
    },
    menuItem: {
      type: String,
      required: false,
      default: () => ''
    },
    disableMenu: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  data () {
    return {
      breadcrumb: {
        items: [{ text: 'Shobbe' }],
        title: this.$route.meta.title,
        pageName: this.$route.meta.pageName
      },
      option: this.menuItem,
      items: []
    }
  },
  mounted () {
    console.log(this.breadcrumb.items)
    // this.init(this.$route)
  },
  methods: {
    init (route) {
      this.breadcrumb.items = []
      const lastItem = route.matched.slice(route.matched.length - 1, route.matched.length)
      const items = route.matched.slice(0, route.matched.length - 1)
      items.concat(this.extraItems, lastItem).forEach(item => {
        if (item.meta.breadcrumbText) {
          this.breadcrumb.items.push({
            title: item.meta.breadcrumbText,
            pageName: item.meta.pageName,
            routeName: item.redirect ? item.redirect : item.name,
            query: item.query,
            params: item.params
          })
        }
      })
    },
    onChangeMenu (value) {
      const item = this.menuItems.find(s => s.value === value)
      if (item !== undefined) {
        this.$router.push({ name: item.name })
      }
      this.$emit('changeMenu', value)
    }
  }
}
</script>

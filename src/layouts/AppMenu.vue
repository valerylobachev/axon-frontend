<template>
  <q-list>
    <template v-for="item in menuItems">
      <q-item
        clickable
        v-ripple
        v-if="item.type === 'link'"
        :to="item.state" exact
        :key="item.state">
        <q-item-section avatar v-if="item.icon">
          <q-icon :name="item.icon" />
        </q-item-section>
        <q-item-section>{{ $t(item.name)}}</q-item-section>
      </q-item>

      <q-separator spaced
                   v-if="item.type === 'header'"
                   :key="item.state + 'head'"/>
      <q-item-label header
                    v-if="item.type === 'header'"
                    :key="item.state">{{ $t(item.name) }}</q-item-label>
      <q-expansion-item
        v-if="item.type === 'sub'"
        :icon="item.icon"
        :label="$t(item.name)"
        :key="item.state">
        <q-list>
          <template v-for="subItem in item.children">
            <q-item
              clickable
              v-ripple
              :inset-level="0.5"
              v-if="subItem.type === 'link'"
              :to="subItem.state" exact
              :key="subItem.state">
              <q-item-section avatar v-if="subItem.icon">
                <q-icon :name="subItem.icon" />
              </q-item-section>
              <q-item-section>{{ $t(subItem.name)}}</q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-expansion-item>
    </template>
  </q-list>

</template>

<script lang="ts">
    import {Component, Vue } from 'vue-property-decorator';
    import {MenuModel} from './menu.model';
    import {MENU} from './menu';

    @Component({
        components: {},
    })
    class AppMenu extends Vue {

        menuItems: MenuModel[] = MENU;

        menuToggle(item) {
            const key = 'isOpen';
            item[key] = !item.isOpen;
            this.menuItems = [...this.menuItems]
        }
    }

    export default AppMenu;
</script>

<style lang="scss" scoped>

</style>

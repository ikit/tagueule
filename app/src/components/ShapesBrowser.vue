<template>
    <div style="width: 100%">
        <v-tabs 
            centered
            v-model="currentShapesIdx"
            @change="updateCollection"
            style="margin: 0; padding: 0;">
              <v-tab 
                v-for="s in data.shapes" 
                :key="s.name">{{s.name}}</v-tab>
        </v-tabs>
        <div style="display: flex; width: 100%">
            <div style="flex: 0 1 0; min-width: 150px; text-align: center">
                <v-select
                    v-model="currentCollectionIdx"
                    :items="collections"
                    @change="updateElements"
                    single-line
                    item-text="name"
                    item-value="idx"
                    ></v-select>
            </div>
            <div style="flex: 1 0 0; margin-left: 0px; border-left: 1px solid #bbb">
                <div class="shapesList">
                    <!-- liste d'image en fonction de l'onglet sélectionné -->
                    <img 
                        v-for="(elt, idx) in elements" 
                        :key="idx" 
                        @click="selectElement(idx)"
                        v-bind:class="{ active: idx === currentElementIdx }"
                        :src=" elt ? `/assets${collections[currentCollectionIdx].path}/${elt}.svg` : `/assets/empty.png`"/>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
import { AssetsCollection } from "../model/AssetsCollection";


export default {
    name: 'ShapesBrowser',
    props: {
        data: {
            type: AssetsCollection,
            default: () => ([]),
        },
    },
    data: () => ({
        currentShapesIdx: 0,
        currentCollectionIdx: 0,
        currentElementIdx: 0,

        collections: [],
        elements: [],
    }),
    mounted: function () {
        this.updateCollection ();
    },
    methods: {
        updateCollection () {
            this.collections = this.data.shapes[this.currentShapesIdx].collections;
            this.currentCollectionIdx = this.data.shapes[this.currentShapesIdx].selectedIndex;
            this.updateElements();
        },
        updateElements() {
            this.data.shapes[this.currentShapesIdx].selectedIndex = this.currentCollectionIdx;
            this.elements = this.collections[this.currentCollectionIdx].elements;
            this.currentElementIdx = this.collections[this.currentCollectionIdx].selectedIndex;
        },
        selectElement(idx) {
            this.currentElementIdx = idx;
            this.collections[this.currentCollectionIdx].selectedIndex = idx;
            // emit
            this.$emit('selectionUpdated', idx);
        },
    }
}

</script>

<style>
.shapesList {
    overflow: auto;
    white-space: nowrap;
    height: 150px;
    background: #f5f5f5;
    padding: 25px 5px 0 5px;


}

.shapesList img {
    height: 100px;
    display: inline-block;
    margin-right: 10px; 
    border: 1px solid #bbb;
}

.active {
    border: 1px solid #000;
    background: khaki;
}
</style>
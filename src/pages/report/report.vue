<template>
<v-app>
  <v-form>
    <v-container grid-list-xl p-0>
      <v-layout wrap>
        <v-flex xs12 md2>
          <v-select v-model="selectedMerchant" :items="merchants" label="Merchants"></v-select>
        </v-flex>
        <v-flex xs12 md2>
          <v-select v-model="selectedCurrency" :items="currencyList" label="Currencies"></v-select>
        </v-flex>
        <v-flex xs12 md2>
          <v-text-field v-model="txnRef" label="Txn Reference"></v-text-field>
        </v-flex>
        
        <v-flex xs12 md3 pt-7>
          <date-picker v-model="value1" valueType="format" lang="en" :not-after="new Date()">
          </date-picker>
        </v-flex>
        
        <v-flex xs12 md2>
          <v-select v-model="selectedDays" :items="days" label="Select Days"></v-select>
        </v-flex>
        <v-flex xs12 md1 pt-7>
          <v-btn v-on:click="searchTxn()">Search</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
  <v-card>
    <v-card-title>
      Historical Report
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="multiCurrHeaders" :items="multiCurrData" :loading="true">
      <template v-slot:item.paymentMode="{ item }">
        <v-img :src="getImageSrc(item.paymentMode, false)" width="30" contain></v-img>
      </template>
      <template v-slot:item.acquirer="{ item }">
        <v-img :src="getImageSrc(item.acquirer, true)" width="30" contain></v-img>
      </template>
    </v-data-table>
  </v-card>
</v-app>
</template>
<style scoped src="./report.css"></style>
<script src="./Report.ts" lang="ts"></script>

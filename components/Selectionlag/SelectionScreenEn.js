import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, SafeAreaView } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 40) / 2; // Adjust spacing and card width as needed
const CARD_MARGIN = 10; // Adjust card margin as needed

const DATA = [
    { id: 1, name: '(IM1) Land Details Search', url: 'https://dharani.telangana.gov.in/knowLandStatus' },
    { id: 2, name: '(IM2) View Market value of lands for Stamp Duty', url: 'https://dharani.telangana.gov.in/viewMarketValueLandStampDuty' },
    { id: 3, name: '(IM3) Prohibited Lands', url: 'https://dharani.telangana.gov.in/prohibitedPropertySearchAgri' },
    { id: 4, name: '(IM4) Search EC Details', url: 'https://dharani.telangana.gov.in/Citizen' },
    { id: 5, name: '(IM4A) EC details before Dharani', url: 'https://prereg.telangana.gov.in/AgricultureEC/index.htm' },
    { id: 6, name: '(IM5) echallan/Application Status', url: 'https://dharani.telangana.gov.in/ApplicationStatus' },
    { id: 7, name: '(IM6) Downloads', url: 'https://dharani.telangana.gov.in/registeredDocumentDetails' },
    { id: 8, name: '(IM7) Online Dashboard', url: 'https://dharani.telangana.gov.in/agricultureDashDateSearch' },
    { id: 9, name: '(IM8) Cadastral Maps', url: 'https://dharani.telangana.gov.in/gis/' },
    { id: 10, name: '(IM9) Bankers Portal', url: 'https://dharani.telangana.gov.in/Bank' },
    { id: 11, name: '(IM10) Registered Document Details', url: 'https://dharani.telangana.gov.in/RegDocumentDetails' },
    { id: 12, name: '(TM1) Slot booking for Citizens', url: 'https://dharani.telangana.gov.in/Citizen' },
    { id: 13, name: '(TM1A) Additional payments for slots already booked', url: 'https://dharani.telangana.gov.in/Citizen' },
    { id: 14, name: '(TM2) Registration of (Sale & Gift)', url: 'https://dharani.telangana.gov.in/RegistrationofSaleGiftMessage' },
    { id: 15, name: '(TM3) Apply for Mutation', url: 'https://dharani.telangana.gov.in/ApplicationForMutationMessage' },
    { id: 16, name: '(TM4) Application for succession including assigned lands(with or without PPB)', url: 'https://www.example.com' },
    { id: 17, name: '(TM5) Application for Partition', url: 'https://dharani.telangana.gov.in/RegistrationofPartitionMessage' },
    { id: 18, name: '(TM6) Application for NALA', url: 'https://dharani.telangana.gov.in/ApplicationForNALAMessage' },
    { id: 19, name: '(TM7) Application for NALA without Passbook', url: 'https://dharani.telangana.gov.in/ApplicationforDirectNALAMessage' },
    { id: 20, name: '(TM8) Registration of Mortgage', url: 'https://dharani.telangana.gov.in/RegistrationofMortgageMessage' },
    { id: 21, name: '(TM9) Application for Lease', url: 'https://dharani.telangana.gov.in/RegistrationofLeaseMessage' },
    { id: 22, name: '(TM10) Application for GPA/SPA/Executed GPA', url: 'https://dharani.telangana.gov.in/ExecutedGPADGPAAGPAfunctionalMessage' },
    { id: 23, name: '(TM11) Application for GPA', url: 'https://dharani.telangana.gov.in/ApplicationforGPAMessage' },
    { id: 24, name: '(TM12) Registration for GPA', url: 'https://dharani.telangana.gov.in/RegistrationofGPAMessage' },
    { id: 25, name: '(TM13) Registration of DAGPA', url: 'https://dharani.telangana.gov.in/RegistrationofDAGPAMessage' },
    { id: 26, name: '(TM14) Grievances on specific land matters', url: 'https://dharani.telangana.gov.in/GrievanceLandMattersMessage' },
    { id: 27, name: '(TM15) Grievance relating to inclusion in Prohibited Properties List', url: 'https://dharani.telangana.gov.in/GrievancerelatingToProhibitedpropertiesMessage' },
    { id: 28, name: '(TM16) Grievance related to Lands Acquired', url: 'https://dharani.telangana.gov.in/GrievanceToAcquiredLandsMessage' },
    { id: 29, name: '(TM17) Cancellation of Slot Booked', url: 'https://dharani.telangana.gov.in/CancellationOfTheSlotbookingMessage' },
    { id: 30, name: '(TM18) Slot Reschedule', url: 'https://dharani.telangana.gov.in/SlotrescheduleMessage' },
    { id: 31, name: '(TM19) Ratification/Cancellation of Registered Documents', url: 'https://dharani.telangana.gov.in/RatificationRegDocuments' },
    { id: 32, name: '(TM20) NRI Portal', url: 'https://dharani.telangana.gov.in/NRILoginMessage' },
    { id: 33, name: '(TM21) where Aadhar authentication not done', url: 'https://dharani.telangana.gov.in/ApplicationPPBNoAadhaarMessage' },
    { id: 34, name: '(TM22) Apply for PPB by Institution', url: 'https://dharani.telangana.gov.in/PPBfornstitutionMessage' },
    { id: 35, name: '(TM23) Apply for PPB -Semi Urban Land', url: 'https://dharani.telangana.gov.in/PPBSemiUrbanLandsMessage`' },
    { id: 36, name: '(TM24) Application for PPB-Court Case', url: 'https://dharani.telangana.gov.in/PPBcourtorderMessage' },
    { id: 37, name: '(TM25) Apply for Duplicate PPB', url: 'https://dharani.telangana.gov.in/PPBduplicateMessage' },
    { id: 38, name: '(TM26) Court Cases & Intimation', url: 'https://dharani.telangana.gov.in/CourtCasesIntimationMessage' },
  ];
  

const renderCard = (item, navigation) => (
  <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('WebView', { uri: item.url })}>
    <Text style={styles.cardText}>{item.name}</Text>
  </TouchableOpacity>
);

const SelectionScreenEn = ({ navigation }) => {
  const renderTwoColumns = ({ item }) => (
    <View style={styles.columnContainer}>
      {renderCard(item, navigation)}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderTwoColumns}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 25,
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: CARD_MARGIN / 2,
    paddingBottom: CARD_MARGIN / 2,
  },
  columnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: CARD_MARGIN,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    width: CARD_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SelectionScreenEn;

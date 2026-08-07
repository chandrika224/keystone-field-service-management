	//package com.keystone.service;
	//
	//import static org.junit.jupiter.api.Assertions.*;
	//import static org.mockito.Mockito.*;
	//
	//import java.util.Optional;
	//
	//import com.keystone.entity.Customer;
	//import com.keystone.repository.CustomerRepository;
	//import com.keystone.service.impl.CustomerServiceImpl;
	//
	//import org.junit.jupiter.api.BeforeEach;
	//import org.junit.jupiter.api.Test;
	//import org.mockito.InjectMocks;
	//import org.mockito.Mock;
	//import org.mockito.MockitoAnnotations;
	//
	//public class CustomerServiceImplTest {
	//
	//    @Mock
	//    private CustomerRepository customerRepository;
	//
	//    @InjectMocks
	//    private CustomerServiceImpl customerService;
	//
	//    @BeforeEach
	//    void setUp() {
	//        MockitoAnnotations.openMocks(this);
	//    }
	//
	//    @Test
	//    void testGetCustomerById() {
	//
	//        Customer customer = new Customer();
	//        customer.setCustomerId(1L);
	//        customer.setCustomerName("Rahul");
	//
	//        when(customerRepository.findById(1L))
	//                .thenReturn(Optional.of(customer));
	//
	//        Customer result = customerService.getCustomerById(1L);
	//
	//        assertEquals("Rahul", result.getCustomerName());
	//        
	//    }
	//    @Test
	//    void testDeleteCustomer() {
	//
	//        doNothing().when(customerRepository).deleteById(1L);
	//
	//        customerService.deleteCustomer(1L);
	//
	//        verify(customerRepository, times(1)).deleteById(1L);
	//    }
	//}
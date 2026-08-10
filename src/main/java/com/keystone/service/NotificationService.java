package com.keystone.service;

import com.keystone.entity.WorkOrder;

public interface NotificationService {

    void notifySlaBreach(WorkOrder workOrder);

}
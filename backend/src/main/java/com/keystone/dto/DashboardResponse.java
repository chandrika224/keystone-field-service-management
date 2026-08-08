package com.keystone.dto;

public class DashboardResponse {

    private long totalCustomers;
    private long totalTechnicians;
    private long totalWorkOrders;
    private long openWorkOrders;
    private long assignedWorkOrders;
    private long inProgressWorkOrders;
    private long completedWorkOrders;
    private long slaBreachedCount;
    

    public long getSlaBreachedCount() {
		return slaBreachedCount;
	}

	public void setSlaBreachedCount(long slaBreachedCount) {
		this.slaBreachedCount = slaBreachedCount;
	}

	public DashboardResponse() {
    }

    public long getTotalCustomers() {
        return totalCustomers;
    }

    public void setTotalCustomers(long totalCustomers) {
        this.totalCustomers = totalCustomers;
    }

    public long getTotalTechnicians() {
        return totalTechnicians;
    }

    public void setTotalTechnicians(long totalTechnicians) {
        this.totalTechnicians = totalTechnicians;
    }

    public long getTotalWorkOrders() {
        return totalWorkOrders;
    }

    public void setTotalWorkOrders(long totalWorkOrders) {
        this.totalWorkOrders = totalWorkOrders;
    }

    public long getOpenWorkOrders() {
        return openWorkOrders;
    }

    public void setOpenWorkOrders(long openWorkOrders) {
        this.openWorkOrders = openWorkOrders;
    }

    public long getAssignedWorkOrders() {
        return assignedWorkOrders;
    }

    public void setAssignedWorkOrders(long assignedWorkOrders) {
        this.assignedWorkOrders = assignedWorkOrders;
    }

    public long getInProgressWorkOrders() {
        return inProgressWorkOrders;
    }

    public void setInProgressWorkOrders(long inProgressWorkOrders) {
        this.inProgressWorkOrders = inProgressWorkOrders;
    }

    public long getCompletedWorkOrders() {
        return completedWorkOrders;
    }

    public void setCompletedWorkOrders(long completedWorkOrders) {
        this.completedWorkOrders = completedWorkOrders;
    }

	
}
package com.keystone.util;

import java.util.EnumMap;
import java.util.EnumSet;
import java.util.Map;
import java.util.Set;

import com.keystone.enums.WorkOrderStatus;

public class WorkOrderStatusValidator {

    private static final Map<WorkOrderStatus, Set<WorkOrderStatus>> VALID_TRANSITIONS =
            new EnumMap<>(WorkOrderStatus.class);

    static {

        VALID_TRANSITIONS.put(
                WorkOrderStatus.NEW,
                EnumSet.of(WorkOrderStatus.ASSIGNED));

        VALID_TRANSITIONS.put(
                WorkOrderStatus.ASSIGNED,
                EnumSet.of(
                        WorkOrderStatus.IN_PROGRESS,
                        WorkOrderStatus.ON_HOLD));

        VALID_TRANSITIONS.put(
                WorkOrderStatus.IN_PROGRESS,
                EnumSet.of(
                        WorkOrderStatus.ON_HOLD,
                        WorkOrderStatus.COMPLETED));

        VALID_TRANSITIONS.put(
                WorkOrderStatus.ON_HOLD,
                EnumSet.of(
                        WorkOrderStatus.IN_PROGRESS));

        VALID_TRANSITIONS.put(
                WorkOrderStatus.COMPLETED,
                EnumSet.of(
                        WorkOrderStatus.CLOSED));

        VALID_TRANSITIONS.put(
                WorkOrderStatus.CLOSED,
                EnumSet.noneOf(WorkOrderStatus.class));
    }

    public static boolean isValidTransition(
            WorkOrderStatus current,
            WorkOrderStatus next) {

        return VALID_TRANSITIONS
                .getOrDefault(current, EnumSet.noneOf(WorkOrderStatus.class))
                .contains(next);
    }
}
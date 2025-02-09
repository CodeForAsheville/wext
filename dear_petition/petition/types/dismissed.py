from django.db.models import Q

from dear_petition.petition.models import OffenseRecord
from dear_petition.petition.constants import DISMISSED_DISPOSITION_METHODS


def get_offense_records(batch, jurisdiction=""):
    qs = OffenseRecord.objects.filter(offense__ciprs_record__batch=batch)
    if jurisdiction:
        qs = qs.filter(offense__ciprs_record__jurisdiction=jurisdiction)
    qs = qs.filter(build_query()).exclude(severity__in=["INFRACTION", "TRAFFIC"])
    return qs.select_related("offense__ciprs_record__batch")


def build_query():
    action = Q(action="CHARGED")
    methods = Q()
    for method in DISMISSED_DISPOSITION_METHODS:
        methods |= Q(offense__disposition_method__iexact=method)
    guilty_to_lesser = build_guilty_to_lesser_query()
    query = action & methods | guilty_to_lesser
    return query


def build_guilty_to_lesser_query():
    action = Q(action="CHARGED")
    method = Q(offense__disposition_method="DISPOSED BY JUDGE")
    plea = Q(offense__plea="GUILTY TO LESSER")
    query = action & method & plea
    return query

from sqlalchemy.orm import Session
from sqlalchemy import or_
from datetime import datetime

from app.models import Ticket
from app.schemas import TicketCreate, TicketUpdate


def generate_ticket_id(db: Session):
    count = db.query(Ticket).count() + 1
    return f"TKT-{count:03d}"


def create_ticket(db: Session, ticket: TicketCreate):
    ticket_id = generate_ticket_id(db)

    db_ticket = Ticket(
        ticket_id=ticket_id,
        customer_name=ticket.customer_name,
        customer_email=ticket.customer_email,
        subject=ticket.subject,
        description=ticket.description,
        status="Open"
    )

    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)

    return db_ticket


def get_all_tickets(
    db: Session,
    status: str = None,
    search: str = None
):
    query = db.query(Ticket)

    if status:
        query = query.filter(Ticket.status == status)

    if search:
        query = query.filter(
            or_(
                Ticket.ticket_id.contains(search),
                Ticket.customer_name.contains(search),
                Ticket.customer_email.contains(search),
                Ticket.subject.contains(search),
                Ticket.description.contains(search)
            )
        )

    return query.order_by(Ticket.created_at.desc()).all()


def get_ticket_by_id(db: Session, ticket_id: str):
    return db.query(Ticket).filter(
        Ticket.ticket_id == ticket_id
    ).first()


def update_ticket(
    db: Session,
    ticket_id: str,
    ticket_update: TicketUpdate
):
    ticket = get_ticket_by_id(db, ticket_id)

    if not ticket:
        return None

    if ticket_update.status:
        ticket.status = ticket_update.status

    if ticket_update.notes:
        ticket.notes = ticket_update.notes

    ticket.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(ticket)

    return ticket
import Entity from "../models/entity.model";

class EntityRepository {
  public async findByPhone(phone: string): Promise<Entity | null> {
    return Entity.findOne({ where: { phone } });
  }

  public async findById(id: number): Promise<Entity | null> {
    return Entity.findByPk(id);
  }

  public async verify(id: number): Promise<Entity | null> {
    await Entity.update({ verified: true, code: "" }, { where: { id } });
    return Entity.findByPk(id);
  }

  public async create(phone: string): Promise<Entity> {
    return Entity.create({
      phone,
      verified: false,
      code: "",
    });
  }

  public async updateCode(id: number, code: string): Promise<void> {
    await Entity.update({ code }, { where: { id } });
  }
}

export default new EntityRepository();

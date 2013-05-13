class CreateEpicrisisInfeccion < ActiveRecord::Migration
  def change
  	create_table :epicrisis do |t|
      t.integer :dni
      t.integer :nro_historia_clinica
      t.string :fecha_ingreso
      t.string :fecha_egreso

      t.timestamps
    end

    create_table :infeccion do |t|
    	t.string :nombre
    	t.string :antibiotico_usado
    	t.string :antibiotico_usado
    	t.boolean :shock_septico
    	t.boolean :curacion
    	t.integer :epicrisis_id

    	t.timestamps
	  end

    create_table :cultivo_generico do |t|
      t.string :nombre
      t.string :type
      t.boolean :positivo
      t.integer :infeccion_id

      t.timestamps
    end
  end
end

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
    	t.string :antibioticoUsado
    	t.string :antibioticoUsado
    	t.boolean :shockSeptico
    	t.boolean :curacion
    	t.integer :epicrisis_id

    	t.timestamps
	end
  end
end
